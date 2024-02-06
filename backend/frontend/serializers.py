from frontend.models import Customer, Subscriber, Product, OrderProduct, Order
from rest_framework import serializers
from .models import Review


# ------------------Customer------------------------


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        exclude = ('id',)

    def create(self, validated_data):
        return Customer.objects.create(**validated_data)
        

    

# --------------------Order-------------------------------




class OrderProductSerializer(serializers.ModelSerializer):
  

    class Meta:
        model = OrderProduct
        fields = ['product', 'id', 'size', 'quantity', 'subtotal']

    def create(self, validated_data):
        try:
            return Customer.objects.create(**validated_data)
        except Exception as e:
            raise serializers.ValidationError(f"Error creating OrderProduct: {str(e)}")






    
class OrderSerializer(serializers.ModelSerializer):
    owner = CustomerSerializer(source='owner', read_only=True)
    order_products = OrderProductSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        exclude = ('isWhatsapp',)
        fields = ['__all__', 'owner', 'order_products']


    def create(self, validated_data):
        order_products_list = validated_data.pop('order_products')

        try:    
            instance = Order.objects.create(**validated_data)
            for order_item_data in order_products_list:
                try:
                    OrderProduct.objects.create(order=instance, **order_item_data)
                except IntegrityError as e:
                    raise serializers.ValidationError(e)
        except IntegrityError as e:
            raise serializers.ValidationError(e)
        return instance

    def update(self, instance, validated_data):
        try:
            instance.status = validated_data.get('status', instance.status)
            instance.note = validated_data.get('note', instance.note)
            instance.save()
            return instance
        except Exception as e:
            raise serializers.ValidationError(f"Error updating order: {str(e)}")



# -------------------Rewview--------------------------


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
    def create(self, validated_data):
        try:
            instance = Review.objects.create(**validated_data)
        except IntegrityError as e:
            raise serializers.ValidationError(e)
        return instance



    
# -------------------Subscriber--------------------------



class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'
    
    def create(self, validated_data):
        try:
            instance = Subscriber.objects.create(**validated_data)
        except IntegrityError as e:
            raise serializers.ValidationError(e)
        return instance


