from django.db.models.signals import post_save, post_delete, pre_save
from django.db.models import Sum
from django.db import transaction, IntegrityError

from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist,ValidationError

from .models import Order, OrderProduct, Review, Subscriber

from adminpanel.serializers import ProductSerializer, StockSerializer, LetterSerializer
from adminpanel.models import Letter,Product,Stock, Notification

from django.db.models import F
from django.db.models import Sum



@receiver(post_save, sender=OrderProduct)
def updateStock(sender, instance, created, **kwargs):
    if created:
        product = instance.product
        size = instance.size
        quantity = instance.quantity
        stock_data = Stock.objects.select_for_update().get(product=product)
        stock_data.stock_XS = F('stock_XS') - quantity if size == 'XS' else F('stock_XS')
        stock_data.stock_S = F('stock_S') - quantity if size == 'S' else F('stock_S')
        stock_data.stock_M = F('stock_M') - quantity if size == 'M' else F('stock_M')
        stock_data.stock_L = F('stock_L') - quantity if size == 'L' else F('stock_L')
        stock_data.stock_XL = F('stock_XL') - quantity if size == 'XL' else F('stock_XL')

        with transaction.atomic():
            stock_data.save()
            
        stock_data = Stock.objects.select_for_update().get(product=product)
        product_data = Product.objects.select_for_update().get(id=product.id)           
        if all([
            stock_data.stock_XS == 0,
            stock_data.stock_S == 0,
            stock_data.stock_M == 0,
            stock_data.stock_L == 0,
            stock_data.stock_XL == 0
        ]):
            product_data.out_of_stock = True
        else:
            product_data.out_of_stock = False
        product_data.save()



@receiver(post_save, sender=Order)
def createOrderLetter(sender, instance, created, **kwargs):
    if created and instance.isWhatsapp:
        try:
            owner = instance.owner
            phone_number = owner.phone_number
            name = owner.name
            subscriber = Subscriber.objects.filter(phone_number=phone_number).first()
            if not subscriber:
                subscriber = Subscriber(name=name, phone_number=phone_number)
                subscriber.save()
            order_tracking_id = instance.tracking_id
            letter_body = f"Thank you for your order! Your order with tracking ID {order_tracking_id} has been successfully placed."
            letter = Letter(body=letter_body)
            letter.save()
            letter.receiver.add(subscriber)
        except Exception as e:
            print(f"Error creating order letter: {e}")


@receiver(post_save, sender=Review)
def notifyLowReview(sender, instance, created, **kwargs):
    if created and instance.rating == 1:
        try:
            owner = instance.orderProduct.order.owner
            product = instance.orderProduct.product
            review_body = instance.body
            
            notification_body = f"{product.name} received 1 star. "
            notification_body += f"Review: {review_body}" if review_body else "Reason not provided."
            notification_body += f" You can contact {owner.name} at {owner.phone_number}."
            notification_body += f" (This product has {product.vote}% positive votes.)"
            
            notification_data = {
                'body': notification_body
            }   
            try:
                Notification.objects.create(**notification_data)
            except Exception as e:
                print(f"Error creating notification: {e}")
        except ObjectDoesNotExist as e:
            print(f"Object does not exist: {e}")
        except Exception as e:
            print(f"Error handling low review: {e}")


@receiver(post_save, sender=Subscriber)
def createWelcomeLetter(sender, instance, created, **kwargs):
    if created:
        try:
            subscriber_name = instance.name
            letter_body = f"Hello {subscriber_name}! Thank you for subscribing. Welcome to our community."
            letter = Letter(body=letter_body)
            letter.save()
            letter.receiver.add(instance)
        except Exception as e:
            print(f"Error creating welcome letter: {e}")


@receiver(post_save, sender=Review)
def update_vote(sender, instance, **kwargs):
    if sender == Review:
        rating = instance.rating
        product_id = instance.product.id
        try:
            if rating and product_id:
                product = Product.objects.get(id=product_id)
                total_reviews = int(product.reviews.count() * 5)
                total_rating = int(product.reviews.aggregate(Sum('rating'))['rating__sum'])              
                average_rating = total_rating / total_reviews
                product.vote = int(average_rating * 100)
                product.save()
        except Product.DoesNotExist:
            print("Product does not exist.")
        except ZeroDivisionError:
            print("Cannot calculate average rating with zero reviews.")
        except IntegrityError as e:
            print(f"IntegrityError: {e}")
 
@receiver(post_save, sender=Order)           
def updateDelivery(sender, instance, **kwargs):
    if instance.deliveredAt and instance.isWhatsapp:
        try:
            owner_name = instance.owner.name
            phone_number = instance.owner.phone_number
            
            subscriber = Subscriber.objects.filter(phone_number=phone_number).first()
            if not subscriber:
                subscriber = Subscriber(name=owner_name, phone_number=phone_number)
                subscriber.save()
                
            order_tracking_id = instance.tracking_id
            letter_body = f"Hello {owner_name}! Your order with tracking id {order_tracking_id} was delivered successfully at {instance.deliveredAt.strftime('%d-%m-%Y-%H-%M')}"
            try:
                letter = Letter(body=letter_body)
                letter.save()
                letter.receiver.add(subscriber)
            except Exception as e:
                 print(f"Error creating delivery letter: {e}")

        except Exception as e:
            print(f"Error creating delivery letter: {e}")




post_save.connect(updateDelivery, sender=Order)
post_save.connect(createOrderLetter, sender=Order)
post_save.connect(notifyLowReview, sender=Review)
post_save.connect(updateStock, sender=OrderProduct)
post_save.connect(createWelcomeLetter, sender=Subscriber)
