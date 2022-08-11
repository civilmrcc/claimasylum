from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail
from django.conf import settings
import logging
import pgpy
import json


logger = logging.getLogger('claimasylum')

def index(request):
    logger.info('Form Submitted')
    #get formdata
    formdata = json.loads(request.body)['formdata']

    pub_key, _ = pgpy.PGPKey.from_file(str('/code/publickeys/worker.asc'))
    priv_key, _ = pgpy.PGPKey.from_file(str('/code/privatekeys/server.pgp'))
   
    # Encrypt string
    txt_msg = pgpy.PGPMessage.new(json.dumps(formdata))
    encrypted_txt_msg = pub_key.encrypt(txt_msg)
    # from pgpy documentation:
    # the bitwise OR operator '|' is used to add a signature to a PGPMessage.
    encrypted_txt_msg |= priv_key.sign(encrypted_txt_msg)
    #EMAIL_HOST_USER
    send_mail(
        'New Request submitted',
        str(encrypted_txt_msg),
        getattr(settings, "EMAIL_FROM_MAIL", None),
        [getattr(settings, "CLAIMASYLUM_NOTIFICATION_MAIL", None)],
        fail_silently=False,
    )
    logger.info('Request from server successfull')
    print("Mail sent.")
    return HttpResponse(200)
