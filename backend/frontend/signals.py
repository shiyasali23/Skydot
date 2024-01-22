from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Sum
from django.core.exceptions import ObjectDoesNotExist

@receiver(post_save, sender=Order)
def updateStock(sender, instance, created, **kwargs):
    if created:
        try:
            order_products = OrderProduct.objects.filter(order=instance) 
            for order_product in order_products:
                    product = order_product.product
                    size = order_product.size
                    quantity = order_product.quantity
                    stock_entry = Stock.objects.get(product=product)
                    
                    if size == 'XS':
                        stock_entry.stock_XS -= quantity
                    elif size == 'S':
                        stock_entry.stock_S -= quantity
                    elif size == 'M':
                        stock_entry.stock_M -= quantity
                    elif size == 'L':
                        stock_entry.stock_L -= quantity
                    elif size == 'XL':
                        stock_entry.stock_XL -= quantity
                    
                    stock_entry.save()

                    product_data = CreateProductSerializer(product).data
                    serializer = CreateStockSerializer(stock_entry, data=product_data, partial=True)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()

        except ObjectDoesNotExist as e:
            print(f"Error updating stock: {e}")
        except Exception as e:
            print(f"Error updating stock: {e}")


@receiver(post_save, sender=Review)
def updateProductVote(sender, instance, created, **kwargs):
    if created:
        try:
            product = instance.orderProduct.product  
            if product:
                reviews = Review.objects.filter(orderProduct__product=product)  
                total_reviews = reviews.count()
                if total_reviews > 0:
                    sum_ratings = reviews.aggregate(total_rating=Sum('rating'))['total_rating']
                    new_vote_percentage = round((sum_ratings / (total_reviews * 5)) * 100)
                else:
                    new_vote_percentage = 0
                product.vote = new_vote_percentage
                product.save()

                product_data = CreateProductSerializer(product).data
                serializer = CreateProductSerializer(product, data=product_data, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save()

        except ObjectDoesNotExist as e:
            print(f"Error updating vote_percentage: {e}")
        except Exception as e:
            print(f"Error updating vote_percentage: {e}")




@receiver(post_save, sender=Order)
def createOrderLetter(sender, instance, created, **kwargs):
    if created:
        try:
            owner = instance.owner
            order_tracking_id = instance.tracking_id
            letter_body = f"Thank you for your order! Your order with tracking ID {order_tracking_id} has been successfully placed."
            letter_data = {'body': letter_body}
            serializer = CreateLetterSerializer(data=letter_data)
            serializer.is_valid(raise_exception=True)
            letter = serializer.save()
            letter.receiver.add(owner)
        except Exception as e:
            print(f"Error creating letter: {e}")



@receiver(post_save, sender=Review)
def updateLowReview(sender, instance, created, **kwargs):
    try:
        if created and instance.rating == 1:
            owner_name = instance.orderProduct.order.owner.name
            product_name = instance.orderProduct.product.name
            notification_data = {'body': f"{owner_name} gave a low rating (1 star) to {product_name}."}
            serializer = CreateNotificationSerializer(data=notification_data)

            try:
                serializer.is_valid(raise_exception=True)
                serializer.save()
            except serializers.ValidationError as e:
                print(f"Validation error while creating notification: {e}")
            except Exception as e:
                print(f"Error saving notification: {e}")

    except Exception as e:
        print(f"Error in updateLowReview signal: {e}")


@receiver(post_save, sender=Subscriber)
def createWelcomeLetter(sender, instance, created, **kwargs):
    if created:
        try:
            subscriber_id = instance.id
            subscriber_name = instance.name
            letter_body = f"Hello {subscriber_name}! Thank you for subscribing. Welcome to our community."
            letter_data = {'body': letter_body}
            serializer = CreateLetterSerializer(data=letter_data)
            serializer.is_valid(raise_exception=True)
            letter = serializer.save()
            letter.receiver.add(subscriber_id)
        except Exception as e:
            print(f"Error creating welcome letter: {e}")


post_save.connect(createOrderLetter, sender=Order)
post_save.connect(updateLowReview, sender=Review)
post_save.connect(updateProductVote, sender=Review)
post_save.connect(updateStock, sender=Order)
post_save.connect(createWelcomeLetter, sender=Order)
