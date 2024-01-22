from django.urls import path
from main.views import customers_views


urlpatterns = [
    path('customer/register/', customers_views.registerCustomer, name='customer-register'),
    path('customer/', customers_views.getCustomers, name="all-customers"),
    path('customer/<str:pk>/', customers_views.getCustomer, name='get-customer'),

    path('orders/register/', orders_views.registerOrder, name='orders-register'),
    path('orders/', orders_views.getOrders, name='all-order'),
    path('orders/<str:pk>/', orders_views.getOrder, name='get-order'),
    path('orderitems/', orders_views.getOrderItems, name='get-orderitems'),

     path('subscribers/register/', subscribers_views.registerSubscriber, name='subscribers-register'),
    path('subscribers/', subscribers_views.getSubscribers, name="all-subscribers"),
    path('subscribers/<str:pk>/', subscribers_views.getSubscriber, name="subscriber"),

]
