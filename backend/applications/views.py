from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail
from django.conf import settings

import pgpy
import json

def index(request):
    #get formdata
    formdata = json.loads(request.body)['formdata']

    PUBLIC_KEY_FILE = '/code/publickeys/public.asc'    
    pub_key, _ = pgpy.PGPKey.from_file(str(PUBLIC_KEY_FILE))

    # Encrypt string
    txt_msg = pgpy.PGPMessage.new(json.dumps(formdata))
    encrypted_txt_msg = pub_key.encrypt(txt_msg)
    #EMAIL_HOST_USER
    send_mail(
        'New Request submitted',
        str(encrypted_txt_msg),
        getattr(settings, "EMAIL_FROM_MAIL", None),
        [getattr(settings, "CLAIMASYLUM_NOTIFICATION_MAIL", None)],
        fail_silently=False,
    )
    print(getattr(settings, "EMAIL_FROM_MAIL", None),getattr(settings, "CLAIMASYLUM_NOTIFICATION_MAIL", None))
    print("Mail sent.")
    return HttpResponse(200)
