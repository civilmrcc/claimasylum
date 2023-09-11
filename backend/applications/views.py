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
        #polygon and multipolygon behave nearly the same,
        #@todo the code below could be moved to a function
        if area['geometry']['type'] == 'Polygon':
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
            #print("got multipolygon",len(area['geometry']['coordinates']),area['properties']['priority'])
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
        #print('polygon matched')
        return {'status':'matched_polygon','polygon':closest_polygon}
    else:
        print("did not match polygon - use closest polygon:")

        # Find the closest polygon
        closest_polygon = None
        min_distance = float('inf')
        for item in poly_items:
            #the distance returned by shapely is in degrees, which has to be converted to metric
            closest_polygon_point = nearest_points(item.polygon, point)            
            line_string = LineString([closest_polygon_point[0], closest_polygon_point[1]])
            geod = Geod(ellps="WGS84")
            min_distance_meters = geod.geometry_length(line_string)

            if min_distance_meters < min_distance:
                #print("new min distance:!!",min_distance_meters,min_distance)
                min_distance = min_distance_meters
                closest_polygon = item.area

        if min_distance <= 100000: #100km
            return {'status':'no_match_closest_polygon','polygon':closest_polygon}
        else:
            
            logger.info('request sent, but distance was to large')
    return False

def index(request):
    logger.debug('Form Submitted')
    #get formdata
    formdata = json.loads(request.body)['formdata']
    logger.debug('Formdata:',formdata)

    matched_polygon = validate_coordinates((formdata['locationInfo']['location']['lng'],formdata['locationInfo']['location']['lat']))

    #print(formdata['locationInfo']['location']['lng'],formdata['locationInfo']['location']['lat'])
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
        logger.info('Request from server sent successfully via mail (STILL TESTING DATA, no real data)')
        response_data = {'status':matched_polygon['status'],'properties':matched_polygon['polygon']['properties']}

        logger.info('returned confirmation message to user, with data:')
        logger.info(response_data)
        return HttpResponse(json.dumps(response_data))
    
    raise BadRequest({'error_message':'unknown_error'})