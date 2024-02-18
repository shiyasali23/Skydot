from django.urls import path
from . import views 

urlpatterns = [
    path('products/', views.getProducts, name="all-products"),
    path('product/<str:pk>/', views.getProduct, name="product"),
    path('product/create/', views.createProduct, name="create-product"),
    path('product/update/<str:pk>/', views.updateProduct, name="update-product"),
    path('product/delete/<str:pk>/', views.deleteProduct, name="delete-product"),

 
    path('letters/', views.getLetters, name="all-letters"),
    path('letter/<str:pk>/', views.getLetter, name="letter"),
    path('letter/create/', views.createLetter, name="create-letter"),


    path('notifications/', views.getNotifications, name="all-notifications"),
    path('notification/<str:pk>/', views.getNotification, name="notification"),
    path('notification/update/<str:pk>/', views.updateNotification, name="create-notification"),

]
