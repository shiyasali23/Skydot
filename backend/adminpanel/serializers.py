from rest_framework import serializers
from adminpanel.models import Product, Stock, ProductImage, Message
from django.db import IntegrityError
from django.contrib.auth.models import User

from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken



# ---------------------Authentication---------------------




class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)


# ------------------------Product---------------------------

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        exclude = ['id']

    

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        exclude = ['id']



class ProductSerializer(serializers.ModelSerializer):
    stock = StockSerializer()
    images = ProductImageSerializer()
    
    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        stock_data = validated_data.pop('stock', None)

        try:
            instance = super().create(validated_data)
            if stock_data:
                Stock.objects.create(product=instance, **stock_data)
            return instance
        except Exception as e:
            raise serializers.ValidationError(f"Failed to create product: {str(e)}")

    def update(self, instance, validated_data):
        stock_data = validated_data.pop('stock', None)

        try:
            instance = super().update(instance, validated_data)
            if stock_data:
                stock_instance = instance.stock
                for key, value in stock_data.items():
                    setattr(stock_instance, key, value)
                stock_instance.save()
            return instance
        except Exception as e:
            raise serializers.ValidationError(f"Failed to update product: {str(e)}")
   
# -------------------Message---------------------------

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

    
    








