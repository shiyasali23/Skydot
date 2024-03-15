from rest_framework import serializers
from .models import Customer, Subscriber, Order, OrderProduct, Review
from django.db import IntegrityError, transaction
from django.core.exceptions import ValidationError


# ------------------Customer-----------------------------

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'



# --------------------Order------------------------------
class OrderProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderProduct
        fields = '__all__'
   
    

class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()
    order_products = OrderProductSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        with transaction.atomic():
            customer_data = validated_data.pop('customer')
            order_products_data = validated_data.pop('order_products')
            customer_instance = Customer.objects.create(**customer_data)
            order_instance = Order.objects.create(customer=customer_instance, **validated_data)
            for order_product_data in order_products_data:
                OrderProduct.objects.create(order=order_instance, **order_product_data)
            return order_instance

 
    def update(self, instance, validated_data):
        try:
            if any(field in validated_data for field in ['status', 'note', 'deliveredAt']):
                instance.status = validated_data.get('status', instance.status)
                instance.note = validated_data.get('note', instance.note)
                instance.deliveredAt = validated_data.get('deliveredAt', instance.deliveredAt)
                instance.save()
            else:
                raise ValidationError("Correct field(s) to update the order.")
            return instance
        except Exception as e:
            raise ValidationError(f"Failed to update order: {str(e)}")






# -------------------Review--------------------------

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
    



# -------------------Subscriber--------------------------

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'
    

