from django.urls import path
from . import views


urlpatterns = [
    path('customer/create/', views.createCustomer, name='customer-create'),
    path('customer/', views.getCustomers, name="all-customers"),
    path('customer/<str:pk>/', views.getCustomer, name='get-customer'),

    path('orders/create/', views.createOrder, name='orders-create'),
    path('orders/', views.getOrders, name='all-order'),
    path('orders/<str:pk>/', views.getOrder, name='get-order'),

     path('subscribers/create/', views.createSubscriber, name='subscribers-create'),
    path('subscribers/', views.getSubscribers, name="all-subscribers"),
    path('subscribers/<str:pk>/', views.getSubscriber, name="subscriber"),

]
