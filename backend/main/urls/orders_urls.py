from django.urls import path
from main.views import orders_views


urlpatterns = [
    path('orders/register/', orders_views.registerOrder, name='orders-register'),
    path('orders/', orders_views.getOrders, name='all-order'),
    path('orders/<str:pk>/', orders_views.getOrder, name='get-order'),
   
    path('orderitems/', orders_views.getOrderItems, name='get-orderitems'),
]




