from django.urls import path
from main.views import customers_views


urlpatterns = [
    path('customer/register/', customers_views.registerCustomer, name='customer-register'),
    path('customer/', customers_views.getCustomers, name="all-customers"),
    path('customer/<str:pk>/', customers_views.getCustomer, name='get-customer'),

]
