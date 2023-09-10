from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail
from django.core.exceptions import BadRequest
from django.conf import settings
from pyproj import Geod
from shapely.geometry import Point,LineString,Polygon
from shapely.ops import nearest_points
from dataclasses import dataclass

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
    poly_items = []
    matched_polygon = None
    @dataclass
    class Item:
        polygon:Polygon
        area:dict
        #returns distance in meters
        def distance_to_point(self, point:Point):
            p1, p2 = nearest_points(self.polygon, point)
            line_string = LineString([p1,p2])
            geod = Geod(ellps="WGS84")
            return geod.geometry_length(line_string)

    for area_id, area in enumerate(features):
        print(area['geometry']['type'], area_id)
        if area['geometry']['type'] == 'Polygon':
            print("got polygon")
            polygon = Polygon(area['geometry']['coordinates'][0])
            poly_item  = Item(Polygon(area['geometry']['coordinates'][0]), area)
            poly_items.append(poly_item)
            if poly_item.polygon.contains(point):
                # check if looped area has higher priotity than polygon which has
                # been saved in var "matched_polygon" and if so -> safe it.
                if not matched_polygon:
                    matched_polygon = poly_item
                if area['properties']['priority'] > matched_polygon['area']['properties']['priority']:
                    matched_polygon = poly_item
        if area['geometry']['type'] == 'MultiPolygon':
            print("got multipolygon",len(area['geometry']['coordinates']))
            for polyg in area['geometry']['coordinates']:
                poly_item  = Item(Polygon(polyg[0]), area)
                poly_items.append(poly_item)
                if poly_item.polygon.contains(point):
                    # check if looped area has higher priotity than polygon which has
                    # been saved in var "matched_polygon" and if so -> safe it.
                    if not matched_polygon:
                        matched_polygon = poly_item
                    if area['properties']['priority'] > matched_polygon['area']['properties']['priority']:
                        matched_polygon = poly_item
    if matched_polygon:
        print(matched_polygon)
        return matched_polygon
    else:
        print("did not match polygon - use closest polygon:")
        closest_item = min(poly_items, key=lambda item:item.distance_to_point(point))
        print(closest_item['properties'])
        distance = closest_item.distance_to_point(point)
        if distance <= 9999999999999:
            return closest_item
        else:
            print("distance to large")
    return False

def index(request):
    logger.debug('Form Submitted')
    #get formdata
    formdata = json.loads(request.body)['formdata']
    logger.debug('Formdata:',formdata)
    matched_polygon = validate_coordinates((formdata['locationInfo']['location']['lng'],formdata['locationInfo']['location']['lat']))
    print(formdata['locationInfo']['location']['lng'],formdata['locationInfo']['location']['lat'])
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