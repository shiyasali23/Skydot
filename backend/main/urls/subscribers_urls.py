from django.urls import path
from main.views import subscribers_views

urlpatterns = [

    path('subscribers/register/', subscribers_views.registerSubscriber, name='subscribers-register'),
    path('subscribers/', subscribers_views.getSubscribers, name="all-subscribers"),
    path('subscribers/<str:pk>/', subscribers_views.getSubscriber, name="subscriber"),
]
