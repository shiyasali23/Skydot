from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist,ValidationError
from django.utils import timezone
from adminpanel.models import  Stock, Product, Letter, Notification
from frontend.models import Subscriber


@receiver(post_save, sender=Stock)
def updateOutOfStock(sender, instance, created, **kwargs):
    product = instance.product
    stock = instance
    try:
        if all([
            stock.stock_XS == 0,
            stock.stock_S == 0,
            stock.stock_M == 0,
            stock.stock_L == 0,
            stock.stock_XL == 0
        ]):
            product.out_of_stock = True
        else:
            product.out_of_stock = False
        product.save()
        if product.out_of_stock:
            notification_body = f"{product.name} is out of stock as of {timezone.now().strftime('%d-%m-%Y-%H-%M')}"
            Notification.objects.create(body=notification_body)
    except Exception as e:
        print(f"Error updating out of stock status: {e}")

@receiver(post_save, sender=Product)
def updateNewProduct(sender, instance, created, **kwargs):
    if created and instance.tag in ['featured', 'new-arrival']:
        letter_body = f"Check out our {instance.tag} {instance.name} at the price of {instance.price}."

        try:
            subscribers = Subscriber.objects.all()
            for subscriber in subscribers:
                Letter.objects.create(body=letter_body, receiver=subscriber)
        except Exception as e:
            print(f"Error creating letter: {e}")


post_save.connect(updateOutOfStock, sender=Stock)
post_save.connect(updateNewProduct, sender=Product)
