from rest_framework import serializers
from admin.models import *

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = '__all__'


# ------------------------Create---------------------------


class CreateProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
        
    def create(self, validated_data):
        try:
            return Product.objects.create(**validated_data)
        except Exception as e:
            raise serializers.ValidationError(e)


class CreateStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

    def create(self, validated_data):
        try:
            return Stock.objects.create(**validated_data)
        except Exception as e:
            raise serializers.ValidationError(e)

class CreateProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

    def create(self, validated_data):
        try:
            return ProductImage.objects.create(**validated_data)
        except Exception as e:
            raise serializers.ValidationError(e)


class CreateMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

    def create(self, validated_data):
        try:
            return Message.objects.create(**validated_data)
        except Exception as e:
            raise serializers.ValidationError(e)


class CreateNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

    def create(self, validated_data):
        try:
            return Notification.objects.create(**validated_data)
        except Exception as e:
            raise serializers.ValidationError(e)



# -------------------Delete---------------------------

class DeleteProductSerializer(serializers.Serializer):
    product_id = serializers.CharField(max_length=22)

    def delete(self):
        product_id = self.validated_data['product_id']

        try:
            product = Product.objects.get(id=product_id)
            product.productimage_set.all().delete()
            product.stock_set.all().delete()
            product.delete()
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product does not exist.")
        except Exception as e:
            raise serializers.ValidationError(e)

class DeleteLetterSerializer(serializers.Serializer):
    letter_id = serializers.CharField(max_length=22)

    def delete(self):
        letter_id = self.validated_data['letter_id']

        try:
            letter = Letter.objects.get(id=product_id)
            letter.delete()
        except Product.DoesNotExist:
            raise serializers.ValidationError("Letter does not exist.")
        except Exception as e:
            raise serializers.ValidationError(e)



