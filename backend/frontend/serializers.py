from main.models import Customer, Subscriber, Product, OrderProduct, Order
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login



# ------------------Customer------------------------


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        exclude = ('id',)

class createCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
        

    def create(self, validated_data):
        return Customer.objects.create(**validated_data)

# --------------------Order-------------------------------




class OrderProductSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = OrderProduct
        fields = ['product_name', 'product_image', 'id', 'size', 'quantity', 'subtotal']

    def get_product_name(self, obj):
        return obj.product.name if obj.product else None

    def get_product_image(self, obj):
        return str(obj.product.main_image) if obj.product else None



class CreateOrderSerializer(serializers.ModelSerializer):
    order_products = OrderProductSerializer(many=True)
    
    class Meta:
        model = Order
        fields = '__all__'
    
    def validate(self, data):
        order_products_list = data.get('order_products', [])
        for order_item in order_products_list:
            product_id = order_item.get('product')
            size = order_item.get('size')
            quantity = order_item.get('quantity')
            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                raise serializers.ValidationError("Product not found.")
            if product.out_of_stock:
                raise serializers.ValidationError("Out of stock for product: {}".format(product.name))      
        return data

    def create(self, validated_data):
        order_products_list = validated_data.pop('order_products')
        order = Order.objects.create(**validated_data)
        for order_item_data in order_products_list:
            OrderProduct.objects.create(order=order, **order_item_data)
        return order

class OrderSerializer(serializers.ModelSerializer):
    owner = CustomerSerializer(source='owner', read_only=True)
    order_products = OrderProductSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        exclude = ('isWhatsapp',)
        fields = ['__all__', 'owner', 'order_products']

# -------------------Rewview--------------------------


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class CreateReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

    def create(self, validated_data):
        return Review.objects.create(**validated_data)
# -------------------Subscriber--------------------------

class RegisterSubscriberSerializer(serializers.ModelSerializer):

    class Meta:
        model = Subscriber
        fields = ['phone_number']

    def create(self, validated_data):
        return Subscriber.objects.create(**validated_data)


class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'


