from django.urls import path
from . import views


urlpatterns = [
    path('customer/create/', views.createCustomer, name='customer-create'),
    path('customers/', views.getCustomers, name="all-customers"),
    path('customer/<str:pk>/', views.getCustomer, name='get-customer'),

    path('order/create/', views.createOrder, name='orders-create'),
    path('order/update/<str:pk>/', views.updateOrder, name='orders-create'),
    path('orders/', views.getOrders, name='all-order'),
    path('order/<str:pk>/', views.getOrder, name='get-order'),

    path('orderproduct/create/', views.createOrderProduct, name='orderproducts-create'),
    path('orderproducts/', views.getOrderProducts, name="all-orderproducts"),
    path('orderproduct/<str:pk>/', views.getOrderProduct, name="orderproduct"),

    path('subscriber/create/', views.createSubscriber, name='subscribers-create'),
    path('subscribers/', views.getSubscribers, name="all-subscribers"),
    path('subscriber/<str:pk>/', views.getSubscriber, name="subscriber"),

    path('review/create/', views.createReview, name='reviews-create'),
    path('reviews/', views.getReviews, name="all-reviews"),
    path('review/<str:pk>/', views.getReview, name="review"),
]

