from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail
from django.conf import settings

import pgpy
import json

def index(request):
    #get formdata
    formdata = json.loads(request.body)['formdata']

    pub_key, _ = pgpy.PGPKey.from_file(str('/code/publickeys/public.asc'))
    priv_key, _ = pgpy.PGPKey.from_file(str('/code/privatekeys/private.pgp'))
   
    # Encrypt string
    txt_msg = pgpy.PGPMessage.new(json.dumps(formdata))
    encrypted_txt_msg = pub_key.encrypt(txt_msg)
    # from pgpy documentation:
    # the bitwise OR operator '|' is used to add a signature to a PGPMessage.
    signature = priv_key.sign(encrypted_txt_msg)

    #EMAIL_HOST_USER
    send_mail(
        'New Request submitted',
        str(encrypted_txt_msg)+'\n'+str(signature),
        getattr(settings, "EMAIL_FROM_MAIL", None),
        [getattr(settings, "EMAIL_FROM_MAIL", None)],
        fail_silently=False,
    )
    print("Mail sent.")
    return HttpResponse(200)
