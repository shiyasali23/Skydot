from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db import IntegrityError
from django.core.exceptions import ObjectDoesNotExist,ValidationError
from django.utils import timezone
from adminpanel.models import  Stock, Product, Message
from frontend.models import Subscriber




@receiver(post_save, sender=Product)
def notifyOutOfStock(sender, instance, **kwargs):
    if instance.out_of_stock:
        try:
            message_data = {
                'body': f"{instance.name} is out of stock as of {timezone.now().strftime('%d-%m-%Y-%H-%M')}",
                'to': 'admin'
            }
            Message.objects.create(**message_data)
        except Exception as e:
            print(f"Error creating Message: {e}")

@receiver(post_save, sender=Product)
def sendProductNotification(sender, instance, created, **kwargs):
    if created and instance.tag in ['featured', 'new-arrival']:
        try:
            message_body = f"Check out our {instance.tag} {instance.name} at the price of {instance.price}."
            Message.objects.get_or_create(body=message_body, to='all')
        except Exception as e:
            print(f"Error creating Message: {e}")

    



