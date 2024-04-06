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
    if request.method == 'POST':        
        try:
            product_data = request.data.dict()
            product_data.pop('images', None)
            product_data.pop('stock', None)
            stock_data = {
                'stock_S': request.data.get('stock[stock_S]'),
                'stock_M': request.data.get('stock[stock_M]'),
                'stock_L': request.data.get('stock[stock_L]'),
                'stock_XL': request.data.get('stock[stock_XL]')
            }
            image_data = {
                'main_image': request.FILES.get("images[main_image]"),
                'sub_image_1': request.FILES.get("images[sub_image_1]"),
                'sub_image_2': request.FILES.get("images[sub_image_2]"),
                'sub_image_3': request.FILES.get("images[sub_image_3]")
            }

            validated_data = {**product_data, 'stock': stock_data, 'images': image_data}
            serializer = ProductSerializer(data=validated_data)
            serializer.is_valid(raise_exception=True)
            serializer.save()           
            return Response(serializer.data, status=status.HTTP_200_OK) 
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# @api_view(['POST'])
# def uploadProductImages(request, pk):
#     if request.method == 'POST':
#         try:
#             product = Product.objects.get(id=pk)
#             image_data = {
#                 'main_image': request.FILES.get("main_image"),
#                 'sub_image_1': request.FILES.get("sub_image_1"),
#                 'sub_image_2': request.FILES.get("sub_image_2"),
#                 'sub_image_3': request.FILES.get("sub_image_3")
#             }
#             product_image = ProductImage.objects.create(product=product, **image_data)
#             updated_product = Product.objects.get(id=pk)
#             serialized_product = ProductSerializer(updated_product)
#             return Response(serialized_product.data, status=status.HTTP_201_CREATED)
#         except Product.DoesNotExist as e:
#             print(e)
#             return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             print(f"failed: {e}")
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)





@api_view(['PUT'])
def updateProduct(request, pk):
    if request.method == 'PUT':
        try:
            product = Product.objects.get(id=pk)
            serializer = ProductSerializer(product, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()           
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


# product_data = {
#     name:'name',
#     description:'description',
#     price:'price',
#     tag:'tag',
#     category:'category',
#     stock:{
#       stock_S:'stock_S',
#       stock_M:'stock_M',
#       stock_L:'stock_L',
#       stock_XL:'stock_XL'
#     },
#     images:{
#       main_image:'main_image',
#       sub_image_1:'sub_image_1',
#       sub_image_2:'sub_image_2',
#       sub_image_3:'sub_image_3'
#     }
#   }