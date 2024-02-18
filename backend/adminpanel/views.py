from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *


# -----------------------Product------------------------

@api_view(['POST'])
def createProduct(request):
    if request.method == 'POST':
        try:
            serializer = ProductSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def updateProduct(request, pk):
    if request.method == 'PUT':
        try:
            product = Product.objects.get(id=pk)
            serializer = ProductSerializer(product, data=request.data, partial=True)  
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            if 'stock' in request.data:
                stock_instance = Stock.objects.get(product=product)
                stock_serializer = StockSerializer(stock_instance, data=request.data['stock'], partial=True)
                if stock_serializer.is_valid():
                    stock_serializer.save()
                else:
                    return Response(stock_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            if 'images' in request.data:
                product_image_instance = ProductImage.objects.get(product=product)
                product_image_serializer = ProductImageSerializer(product_image_instance, data=request.data['images'], partial=True)
                if product_image_serializer.is_valid():
                    product_image_serializer.save()
                else:
                    return Response(product_image_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['DELETE'])
@transaction.atomic
def deleteProduct(request, pk):
    try:
        product = Product.objects.get(id=pk)
        product.delete()
        return Response('Product deleted', status=status.HTTP_204_NO_CONTENT)
    except Product.DoesNotExist as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getProducts(request):
    try:
        products = Product.objects.all()
        serialized_products = ProductSerializer(products, many=True)
        return Response(serialized_products.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(id=pk)
        serialized_product = ProductSerializer(product)
        return Response(serialized_product.data, status=status.HTTP_200_OK)
    except Product.DoesNotExist as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# -----------------------Letter------------------------
@api_view(['POST'])
def createLetter(request):
    if request.method == 'POST':
        try:
            serializer = LetterSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getLetters(request):
    try:
        letters = Letter.objects.all()
        serialized_letters = LetterSerializer(letters, many=True)
        return Response(serialized_letters.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getLetter(request, pk):
    try:
        letter = Letter.objects.get(id=pk)
        serialized_letter = LetterSerializer(letter)
        return Response(serialized_letter.data, status=status.HTTP_200_OK)
    except Letter.DoesNotExist as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# -----------------------Notification------------------------
@api_view(['PUT'])
def updateNotification(request, pk):
    if request.method == 'PUT': 
        try:
            notification = Notification.objects.get(id=pk)
            if 'seen' in request.data:
                data = {'seen': request.data['seen']}  
                serializer = NotificationSerializer(notification, data=data, partial=True)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'The "seen" field is required in the request data.'}, status=status.HTTP_400_BAD_REQUEST)
        except Notification.DoesNotExist as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['GET'])
def getNotifications(request):
    try:
        notifications = Notification.objects.all()
        serialized_notifications = NotificationSerializer(notifications, many=True)
        return Response(serialized_notifications.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getNotification(request, pk):
    try:
        notification = Notification.objects.get(id=pk)
        serialized_notification = NotificationSerializer(notification)
        return Response(serialized_notification.data, status=status.HTTP_200_OK)
    except Notification.DoesNotExist as e:
        print(e)
        return Response({'error': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
