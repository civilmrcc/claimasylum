from django.urls import path

from . import views

urlpatterns = [
    path('userdata', views.index, name='index'),
    #path('userdata/', views.index, name='userdata'),
]