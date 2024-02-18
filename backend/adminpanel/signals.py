from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist,ValidationError
from django.utils import timezone
from adminpanel.models import  Stock, Product, Letter, Notification
from frontend.models import Subscriber




@receiver(post_save, sender=Product)
def notifyOutOfStock(sender, instance, **kwargs):
    if instance.out_of_stock:
        notification_body = f"{instance.name} is out of stock as of {timezone.now().strftime('%d-%m-%Y-%H-%M')}"
        Notification.objects.create(body=notification_body)
        
    
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


post_save.connect(notifyOutOfStock, sender=Product)
post_save.connect(updateNewProduct, sender=Product)
