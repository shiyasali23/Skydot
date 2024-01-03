from django.urls import path
from main.views import guests_views


urlpatterns = [
    path('guests/register/', guests_views.registerGuest, name='guests-register'),
    path('guests/', guests_views.getGuests, name="all-guests"),
    path('guests/<str:pk>/', guests_views.getGuest, name='get-guest'),

]
