from rest_framework import serializers
from admin.models import *


# ------------------------Product---------------------------

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

    def create(self, validated_data):
        try:
            instance = ProductImage.objects.create(**validated_data)
        except IntegrityError as e:
            raise serializers.ValidationError(e)
        return instance

    def update(self, instance, validated_data):
        instance.main_image = validated_data.get('main_image', instance.main_image)
        instance.sub_image_1 = validated_data.get('sub_image_1', instance.sub_image_1)
        instance.sub_image_2 = validated_data.get('sub_image_2', instance.sub_image_2)
        instance.sub_image_3 = validated_data.get('sub_image_3', instance.sub_image_3)
        instance.save()
        return instance

    def delete(self, instance):
        instance.delete()


    

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

    def create(self, validated_data):
        try:
            instance = Stock.objects.create(**validated_data)
        except IntegrityError as e:
            raise serializers.ValidationError(e)
        return instance

    def update(self, instance, validated_data):
        instance.stock_XS = validated_data.get('stock_XS', instance.stock_XS)
        instance.stock_S = validated_data.get('stock_S', instance.stock_S)
        instance.stock_M = validated_data.get('stock_M', instance.stock_M)
        instance.stock_L = validated_data.get('stock_L', instance.stock_L)
        instance.stock_XL = validated_data.get('stock_XL', instance.stock_XL)
        instance.save()
        return instance

    def delete(self, instance):
        instance.delete()


class ProductSerializer(serializers.ModelSerializer):
    stock = StockSerializer()
    images = ProductImageSerializer()

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        stock_data = validated_data.pop('stock', {})
        images_data = validated_data.pop('images', {})

        product = Product.objects.create(**validated_data)

        stock_serializer = StockSerializer(data=stock_data)
        stock_serializer.is_valid(raise_exception=True)
        stock_serializer.save(product=product)

        images_serializer = ProductImageSerializer(data=images_data)
        images_serializer.is_valid(raise_exception=True)
        images_serializer.save(product=product)

        return product

    def update(self, instance, validated_data):
        stock_data = validated_data.pop('stock', {})
        images_data = validated_data.pop('images', {})

        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.price = validated_data.get('price', instance.price)
        instance.category = validated_data.get('category', instance.category)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.tag = validated_data.get('tag', instance.tag)
        instance.vote = validated_data.get('vote', instance.vote)
        instance.out_of_stock = validated_data.get('out_of_stock', instance.out_of_stock)
        instance.save()

        stock_instance = instance.stock
        stock_serializer = StockSerializer(stock_instance, data=stock_data, partial=True)
        stock_serializer.is_valid(raise_exception=True)
        stock_serializer.save()

        images_instance = instance.images
        images_serializer = ProductImageSerializer(images_instance, data=images_data, partial=True)
        images_serializer.is_valid(raise_exception=True)
        images_serializer.save()

        return instance


        

# ------------------------Notification---------------------------



    

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

    def create(self, validated_data):
        try:
            instance = Notification.objects.create(**validated_data)
        except IntegrityError as e:
            raise serializers.ValidationError(e)
        return instance

    def delete(self, instance):
        try:
            instance.delete()
        except Exception as e:
            raise serializers.ValidationError(e)


# -------------------Letter---------------------------



class LetterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Letter
        fields = '__all__'

    def create(self, validated_data):
            try:
                instance = Letter.objects.create(**validated_data)
            except IntegrityError as e:
                raise serializers.ValidationError(e)
            return instance
    def delete(self, instance):
        try:
            instance.delete()
        except Exception as e:
            raise serializers.ValidationError(e)








