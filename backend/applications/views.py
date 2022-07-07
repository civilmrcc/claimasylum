from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail
import pgpy

def index(request):
    PUBLIC_KEY_FILE = '/code/publickeys/public.asc'    
    pub_key, _ = pgpy.PGPKey.from_file(str(PUBLIC_KEY_FILE))
    
    # Encrypt string
    txt_msg = pgpy.PGPMessage.new("Hello PGPy World")
    print('txt_msg.is_encrypted')
    print(txt_msg.is_encrypted)
    print('txt_msg.message')
    print(txt_msg.message)
    encrypted_txt_msg = pub_key.encrypt(txt_msg)
    print('encrypted_txt_msg.is_encrypted')
    print(encrypted_txt_msg.is_encrypted)
    print('encrypted_txt_msg.message')
    print(bytes(encrypted_txt_msg))
    print('asdasd')
    
    send_mail(
        'Subject here',
        'Here is the message.',
        'claimasylum-notifications@systemli.org',
        ['nic.zemke@systemli.org'],
        fail_silently=False,
    )
    print('asdasd')
    return HttpResponse(200)
