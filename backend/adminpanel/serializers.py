from rest_framework import serializers
from adminpanel.models import Product, Stock, ProductImage, Message
from django.db import IntegrityError, transaction
from django.contrib.auth.models import User

from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken



# ---------------------Authentication---------------------






# ------------------------Product---------------------------

class ProductImageSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = ProductImage
        fields = '__all__'  
 
   
class StockSerializer(serializers.ModelSerializer): 
    product = serializers.PrimaryKeyRelatedField(read_only=True)
    
    class Meta:
        model = Stock
        fields = '__all__'
        
      

class ProductSerializer(serializers.ModelSerializer):
    stock = StockSerializer(required=False)
    images = ProductImageSerializer(required=False)
    
    class Meta:
        model = Product
        fields = '__all__'        

    def create(self, validated_data):
        with transaction.atomic():
            stock_data = validated_data.pop('stock', None)
            image_data = validated_data.pop('images', None)
            if stock_data is not None and image_data is not None:
                product = Product.objects.create(**validated_data)
                Stock.objects.create(product=product, **stock_data)
                ProductImage.objects.create(product=product, **img_data)
                return product
            else:
                raise serializers.ValidationError("Stock data and images are required")
            
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

    
    



    # def update(self, instance, validated_data):
    #     stock_data = validated_data.pop('stock', None)

    #     try:
    #         instance = super().update(instance, validated_data)
    #         if stock_data:
    #             stock_instance = instance.stock
    #             for key, value in stock_data.items():
    #                 setattr(stock_instance, key, value)
    #             stock_instance.save()
    #         return instance
    #     except Exception as e:
    #         raise serializers.ValidationError(f"Failed to update product: {str(e)}")
   
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

    
    








