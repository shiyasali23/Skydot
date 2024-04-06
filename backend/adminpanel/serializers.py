from rest_framework import serializers
from adminpanel.models import Product, Stock, ProductImage, Message
from django.db import IntegrityError, transaction
from django.contrib.auth.models import User

from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken



# ------------------------Product---------------------------

class ProductImageSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ProductImage
        exclude = ['id','created']


   
class StockSerializer(serializers.ModelSerializer): 
    product = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = Stock
        exclude = ['id','created']
        
      

class ProductSerializer(serializers.ModelSerializer):
    stock = StockSerializer(required=False)
    images = ProductImageSerializer(required=False)
    
    class Meta:
        model = Product
        fields = '__all__'        

    def create(self, validated_data):
        stock_data = validated_data.pop('stock', None)
        image_data = validated_data.pop('images', None)
        
        if stock_data is not None and image_data is not None:
            with transaction.atomic():
                product = Product.objects.create(**validated_data)
                Stock.objects.create(product=product, **stock_data)
                ProductImage.objects.create(product=product, **image_data)
            return product
        else:
            raise serializers.ValidationError("Stock data and image data are required")

    def update(self, instance, validated_data):
        stock_data = validated_data.pop('stock', None)
        image_data = validated_data.pop('images', None)

        instance = super().update(instance, validated_data)

        if stock_data is not None:
            stock_instance = instance.stock
            if stock_instance:
                stock_serializer = StockSerializer(stock_instance, data=stock_data, partial=True)
                if stock_serializer.is_valid():
                    stock_serializer.save()
                else:
                    raise serializers.ValidationError(stock_serializer.errors)

        if image_data is not None:
            image_instance = instance.images
            if image_instance:
                image_serializer = ProductImageSerializer(image_instance, data=image_data, partial=True)
                if image_serializer.is_valid():
                    image_serializer.save()
                else:
                    raise serializers.ValidationError(image_serializer.errors)

        return instance


    
    
   
# -------------------Message---------------------------

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        exclude = ['created', 'phone_number', 'to']
        
    def update(self, instance, validated_data):
        if 'seen' in validated_data:
            instance.seen = validated_data['seen']
            instance.save()
            return instance
        else:
            raise serializers.ValidationError("Correct field(s) to update the message.")

    
    








