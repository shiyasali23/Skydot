from django.contrib import admin

from .models import *
admin.site.register(Product)
admin.site.register(ProductImages)
admin.site.register(Stock)
admin.site.register(Notification)
admin.site.register(Letter)
