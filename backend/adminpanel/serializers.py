from rest_framework import serializers
from adminpanel.models import Product, Stock, ProductImage, Letter, Notification
from django.db import IntegrityError

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
    stock = StockSerializer(read_only=True)
    images = ProductImageSerializer(read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

   

        

# ------------------------Notification---------------------------



    

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'



# -------------------Letter---------------------------



class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = '__all__'

    
    








