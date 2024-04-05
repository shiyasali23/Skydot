from django.urls import path
from . import views 



urlpatterns = [
    path('product/images/create/<str:pk>/', views.uploadProductImages, name="create-product-images"),
    path('product/create/', views.createProduct, name="create-product"),
    path('product/update/<str:pk>/', views.updateProduct, name="update-product"),
    path('product/delete/<str:pk>/', views.deleteProduct, name="delete-product"),
    path('products/', views.getProducts, name="all-products"),
    path('product/<str:pk>/', views.getProduct, name="product"),

    path('message/create/', views.createMessage, name="create-message"),
    path('message/update/<str:pk>/', views.updateMessage, name="update-message"),
    path('messages/', views.getMessages, name="all-messages"),
    path('message/<str:pk>/', views.getMessage, name="message"),

    path('login/', views.adminLogin, name='admin-login'),

    
]
