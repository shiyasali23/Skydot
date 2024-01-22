from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import IntegrityError
from django.utils import timezone
from .serializers import NotificationSerializer, LetterSerializer

@receiver(post_save, sender=Stock)
def updateOutofstock(sender, instance, **kwargs):
    try:
        if sender == Stock:
            product = instance.product
            if product.stock.stock_XS == 0 and product.stock.stock_S == 0 and product.stock.stock_M == 0 and product.stock.stock_L == 0 and product.stock.stock_XL == 0:
                product.out_of_stock = True
                product.save()

                notification_body = f"{instance.product.name} is out of stock as of {timezone.now().strftime('%d-%m-%Y-%H-%M')}"
                serialized_notification = NotificationSerializer(data={'body': notification_body})
                serialized_notification.is_valid(raise_exception=True)
                serialized_notification.save()
    except Exception as e:
        print(e)


@receiver(post_save, sender=Product)
def createNewProductLetter(sender, instance, **kwargs):
    try:
        if sender == Product:
            if instance.tag in ['featured', 'new-arrival']:
                letter_body = f"Checkout newly launched a new product ({instance.name})"
                serialized_letter = LetterSerializer(data={'body': letter_body})
                serialized_letter.is_valid(raise_exception=True)
                serialized_letter.save()
    except Exception as e:
        print(e)



post_save.connect(updateOutofstock, sender=Stock)
post_save.connect(createNewProductLetter, sender=Product)
