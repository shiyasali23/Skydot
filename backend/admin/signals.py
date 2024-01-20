from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Stock, Notification





@receiver(post_save, sender=Stock)
def update_out_of_stock(sender, instance, **kwargs):
    product = instance.product
    if product.stock.stock_XS == 0 and product.stock.stock_S == 0 and product.stock.stock_M == 0 and product.stock.stock_L == 0 and product.stock.stock_XL == 0:
        product.out_of_stock = True
        product.save()

        Notification.objects.create(body=f"{product.name} is out of stock.")

post_save.connect(update_out_of_stock, sender=Stock)
