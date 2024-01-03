
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('main.urls.products_urls')),
    path('api/', include('main.urls.guests_urls')),
    path('api/', include('main.urls.orders_urls')),
    path('api/', include('main.urls.subscribers_urls')),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)