from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail

import pgpy
import json
import os

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
        'Subject here',
        str(encrypted_txt_msg),
        os.environ.get('EMAIL_HOST_USER'),
        [os.environ.get('EMAIL_HOST_USER')],
        fail_silently=False,
    )
    print("!!DEBUG MODE: Mail sent to own mail")
    return HttpResponse(200)
