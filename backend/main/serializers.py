from main.models import Guest, Subscriber, Product, OrderItem, Order
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login




class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'




# ------------------Guest------------------------


class RegisterGuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = ['id', 'name', 'email', 'phone_number', 'city', 'pincode', 'address',]
        

    def create(self, validated_data):
        return Guest.objects.create(**validated_data)


class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = ['name','email','phone_number','city','address','pincode',]


# --------------------Order-------------------------------



# class OrderItemSerializer(serializers.ModelSerializer):
#     product_name = serializers.SerializerMethodField()

#     class Meta:
#         model = OrderItem
#         fields = [ 'product_name', 'product_id','id','product', 'size', 'quantity',]

#     def get_product_name(self, obj):
#         return obj.product.name if obj.product else None
    


class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.SerializerMethodField()
    product_image = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [ 'product_name', 'product_id','product_image','id','product', 'size', 'quantity',]

    def get_product_name(self, obj):
        return obj.product.name if obj.product else None
    
    def get_product_image(self, obj):
        return str(obj.product.main_image) if obj.product else None





class OrderRegisterSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)    

    class Meta:
        model = Order
        fields = [
            'id', 'owner', 'tax_price', 'shipping_price', 'total_price', 'isWhatsapp',
            'payment_method', 'isDelivered', 'deliveredAt', 'status',
            'tracking_id', 'order_items', 'created'
        ]
        
    def validate(self, data):
        order_items_list = data.get('order_items', [])
        for order_item in order_items_list:
            product_id = order_item['product'].id
            size = order_item.get('size')
            quantity = order_item.get('quantity')
            try:
                product = Product.objects.get(id=product_id)
            except Product.DoesNotExist:
                raise serializers.ValidationError("Product not found.")

            available_stock = getattr(product, f"stock_{size}", 0)

            if available_stock < quantity:
                raise serializers.ValidationError("Out of stock.")

        return data

    def create(self, validated_data):
        order_items_list = validated_data.pop('order_items')
        order = Order.objects.create(**validated_data)

        for order_item in order_items_list:
            OrderItem.objects.create(order=order, **order_item)

        return order


class OrderSerializer(serializers.ModelSerializer):
    owner_details = GuestSerializer(source='owner', read_only=True)
    order_items = OrderItemSerializer(many=True, read_only=True)
    class Meta:
        model = Order
        fields = ['id','owner_details','order_items','shipping_price','total_price','payment_method','isDelivered','deliveredAt','status','tracking_id','created']
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