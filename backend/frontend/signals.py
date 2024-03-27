from django.db.models.signals import post_save, post_delete, pre_save
from django.db.models import Sum, F
from django.db import transaction, IntegrityError

from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist,ValidationError

from .models import Order, OrderProduct, Review, Subscriber
from adminpanel.models import Message,Product,Stock




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

@receiver(post_save, sender=OrderProduct)
def update_total_sold(sender, instance, created, **kwargs):
    if created:
        try:
            quantity = instance.quantity
            product = instance.product

            with transaction.atomic():
                product_data = Product.objects.select_for_update().get(id=product.id)
                product_data.total_sold += quantity
                product_data.save()
                
        except Product.DoesNotExist:
            print(f"Product does not exist with id: {product.id}")
        except Exception as e:
            print(f"Product Total sold updating failed for instance {instance.id}: {e}")

@receiver(post_save, sender=Order)
def notify_order(sender, instance, created, **kwargs):
    try:
        if instance.isWhatsapp and created:
            customer = instance.customer
            order_tracking_id = instance.tracking_id
            phone_number = customer.phone_number

            subscriber, created = Subscriber.objects.get_or_create(phone_number=phone_number, defaults={'name': customer.name})

            message_body = f"Hello {customer.name}. Thank you for your order! Your order with tracking ID {order_tracking_id} has been placed successfully."
            message_data = {
                'body': message_body,
                'to': 'customer',
                'phone_number': phone_number
            }
            Message.objects.create(**message_data)
    except Exception as e:
        print(f"Order Messaging failed {instance.id}: {e}")

    
@receiver(post_save, sender=Order)
def notify_delivery(sender, instance, **kwargs):
    if instance.deliveredAt:
        try:
            customer = instance.customer
            order_tracking_id = instance.tracking_id
            customer_name = customer.name
            delivered_at = instance.deliveredAt.strftime('%d-%m-%Y %H:%M')
            message_body = f"Hello {customer_name}! Your order with tracking id {order_tracking_id} was delivered successfully at {delivered_at}"
            message_data = {
                        'body': message_body,
                        'to': 'customer',
                        'phone_number': customer.phone_number
                    }
            Message.objects.create(**message_data)
        except Exception as e:
            print(f"Order delivered messaging failed {instance.id}: {e}")

            


@receiver(post_save, sender=Review)
def notifyLowReview(sender, instance, created, **kwargs):
    if created and instance.rating == 1:
        try:
            customer = instance.orderProduct.order.customer
            product = instance.orderProduct.product
            review_body = instance.body
            
            message_body = f"{product.name} received 1 star.({product.vote}% positive votes.) "
            message_body += f"Because {review_body}" if review_body else ""
            message_body += f" You can contact {customer.name} at {customer.phone_number}."
            
            message_data = {
                'body': message_body,
                'to':'admin'
            }   
            try:
                Message.objects.create(**message_data)
            except Exception as e:
                print(f"Error creating message: {e}")
        except ObjectDoesNotExist as e:
            print(f"Object does not exist: {e}")
        except Exception as e:
            print(f"Error handling low review: {e}")


@receiver(post_save, sender=Subscriber)
def createWelcomeMessage(sender, instance, created, **kwargs):
    if created:
        try:
            subscriber_name = instance.name
            phone_number = instance.phone_number
            message_data = {
                'body':f"Hello {subscriber_name}! Thank you for subscribing. Welcome to our community.",
                'to':'customer',
                'phone_number': phone_number
            }
            Message.objects.create(**message_data) 
        except Exception as e:
            print(f"Error creating welcome Message: {e}")


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
 




    
        


