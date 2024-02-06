from django.urls import path
from . import views 

urlpatterns = [
    path('products/', views.getProducts, name="all-products"),
    path('products/<str:pk>/', views.getProduct, name="product"),
    path('products/create/', views.createProduct, name="create-product"),
    path('products/update/', views.updateProduct, name="update-product"),
    path('products/delete/', views.deleteProduct, name="delete-product"),

 
    path('letters/', views.getLetters, name="all-letters"),
    path('letters/<str:pk>/', views.getLetter, name="letter"),
    path('letters/create/', views.createLetter, name="create-letter"),


    path('notifications/', views.getNotifications, name="all-notifications"),
    path('notifications/<str:pk>/', views.getNotification, name="notification"),
    path('notifications/create/', views.createNotification, name="create-notification"),

]
