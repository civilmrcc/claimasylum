from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail
from django.core.exceptions import BadRequest
from django.conf import settings

from shapely.geometry import Point
from shapely.geometry.polygon import Polygon

import logging
import pgpy
import json


logger = logging.getLogger('claimasylum_django')

# checks coordinates if they within
# boundaries of polygons defined in 
# ./assets/polygons.geojson
# and return polygon with highes priority
# @param position position to validate
def validate_coordinates(position):
    with open("./assets/polygons.geojson") as f:
        features = json.load(f)["features"]

    point = Point(position)
    matched_polygon = None
    for area in features:
        if area['geometry']['type'] == 'Polygon':
            polygon = Polygon(area['geometry']['coordinates'][0])
            if polygon.contains(point):
                # check if looped area has higher priotity than polygon which has
                # been saved in var "matched_polygon" and if so -> safe it.
                if not matched_polygon:
                    matched_polygon = area
                if area['properties']['priority'] > matched_polygon['properties']['priority']:
                    matched_polygon = area
    if matched_polygon:
        return matched_polygon
    return False

def index(request):
    logger.debug('Form Submitted')
    #get formdata
    formdata = json.loads(request.body)['formdata']
    logger.debug('Formdata:',formdata)
    matched_polygon = validate_coordinates((formdata['locationInfo']['location']['lng'],formdata['locationInfo']['location']['lat']))
    if not matched_polygon:
        logger.error('location_not_in_polygon',formdata)
        raise BadRequest({'error_message':'location_not_in_polygon'})
    pub_key, _ = pgpy.PGPKey.from_file(str('/code/publickeys/worker.asc'))
    priv_key, _ = pgpy.PGPKey.from_file(str('/code/privatekeys/server.pgp'))
   
    # Encrypt string
    txt_msg = pgpy.PGPMessage.new(json.dumps(formdata))
    encrypted_txt_msg = pub_key.encrypt(txt_msg)
    # from pgpy documentation:
    # the bitwise OR operator '|' is used to add a signature to a PGPMessage.
    encrypted_txt_msg |= priv_key.sign(encrypted_txt_msg)
    #EMAIL_HOST_USER
    if send_mail(
        'New Request submitted',
        str(encrypted_txt_msg),
        getattr(settings, "EMAIL_FROM_MAIL", None),
        [getattr(settings, "CLAIMASYLUM_NOTIFICATION_MAIL", None)],
        fail_silently=False,
    ):
        logger.info('Request from server sent successfully via mail')
        return HttpResponse(200)
    raise BadRequest({'error_message':'unknown_error'})