from rest_framework import serializers
from .models import Customer, Subscriber, Order, OrderProduct, Review
from django.db import IntegrityError
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
    owner = CustomerSerializer()
    order_product = OrderProductSerializer(many=True)

    class Meta:
        model = Order
        fields = '__all__'


    def create_customer(self, validated_data):
        try:
            customer_data = validated_data.pop('owner')
            customer = Customer.objects.create(**customer_data)
            return customer
        except Exception as e:
            raise ValidationError(f"Failed to create customer: {str(e)}")

    def create(self, validated_data):
        try:
            order_product_data = validated_data.pop('order_product')
            customer = self.create_customer(validated_data)
            order_instance = Order.objects.create(owner=customer, **validated_data)
            for product_data in order_product_data:
                try:
                    OrderProduct.objects.create(order=order_instance, **product_data)
                except Exception as e:
                    print(e)
                    raise ValidationError(f"Failed to create orderProduct: {str(e)}")
            return order_instance
        except Exception as e:
            raise ValidationError(f"Failed to create order: {str(e)}")
    
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
    

