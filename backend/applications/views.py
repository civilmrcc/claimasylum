from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail

def index(request):
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
