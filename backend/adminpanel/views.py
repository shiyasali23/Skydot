from django.db import transaction
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser

from .serializers import *

# ------------------Authentication------------------------

@api_view(['POST'])
def adminLogin(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None and user.is_active and user.is_superuser:
            refresh = RefreshToken.for_user(user)
            token = {
                'access': str(refresh.access_token),
            }
            return Response(token, status=status.HTTP_200_OK)
        else:
            print('invalid username or password')
            return Response('Invalid username or password', status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    

# -----------------------Product------------------------

@api_view(['POST'])
def createProduct(request):
    print(request.data)
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


@api_view(['POST'])
def uploadImage(request):
    try:
        data = request.data
    
        product_id = data['product_id']
        product = Product.objects.get(_id=product_id)
        
        product.image = request.FILES.get('images')
        product.save()
        return Responce("image uploaded sucesfully")
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


# -----------------------------Messages------------------------

@api_view(['POST'])
def createMessage(request):
    if request.method == 'POST':
        try:
            message_serializer = MessageSerializer(data=request.data)
            if message_serializer.is_valid():
                message_serializer.save()
                return Response({'message': 'Message created successfully'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'error': message_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return Response({'error': 'Method not allowed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
 
@api_view(['PUT'])
def updateMessage(request, pk):
    if request.method == 'PUT':
        try:
            message = Message.objects.get(id=pk)
            serializer = MessageSerializer(message, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Message.DoesNotExist as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)   


@api_view(['GET'])
def getMessages(request):
    try:
        Messages = Message.objects.filter(to='admin') 
        serialized_Messages = MessageSerializer(Messages, many=True)
        return Response(serialized_Messages.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getMessage(request, pk):
    print('kundi')
    try:
        message_instance = Message.objects.get(id=pk)
        serialized_message = MessageSerializer(message_instance)
        return Response(serialized_message.data, status=status.HTTP_200_OK)
    except Message.DoesNotExist as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


