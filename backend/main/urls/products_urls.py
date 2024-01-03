from django.urls import path
from main.views import products_views

urlpatterns = [

    path('products/', products_views.getProducts, name="all-products"),
    path('products/<str:pk>/', products_views.getProduct, name="product"),
]
