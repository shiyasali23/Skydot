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
    stock = StockSerializer()
    
    class Meta:
        model = Product
        fields = '__all__'        

    def create(self, validated_data):
        stock_data = validated_data.pop('stock')
        image_data = validated_data.pop('images')
        product = Product.objects.create(**validated_data)
        stock = Stock.objects.create(product=product, **stock_data)
        image = ProductImage.objects.create(product=product, **image_data)
        return product

    
    



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
        fields = '__all__'

    
    








