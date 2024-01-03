from django.contrib import admin

from .models import *

admin.site.register(Subscriber)
admin.site.register(Guest)
admin.site.register(Order)
admin.site.register(Product)
admin.site.register(OrderItem)

