from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *  




# -----------------------Product------------------------

@api_view(['POST'])
def createProduct(request):
    try:
        if request.method == 'POST':
            serializer = ProductSerializer(data=request.data)

            try:
                serializer.is_valid(raise_exception=True)
            except Exception as validation_error:
                print(1, validation_error)
                return Response({'error': str(validation_error)}, status=status.HTTP_400_BAD_REQUEST)

            try:
                serializer.save()
            except Exception as save_error:
                print(2, save_error)
                return Response({'error': str(save_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as generic_error:
        print(3, generic_error)
        return Response({'error': str(generic_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['PUT'])
def updateProduct(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except Exception as validation_error:
            return Response({'error': str(validation_error)}, status=status.HTTP_400_BAD_REQUEST)

        try:
            serializer.save()
        except Exception as save_error:
            return Response({'error': str(save_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_product(request, product_id):
    try:
        product = Product.objects.get( id=product_id)
        
        stock_instance = product.stock
        stock_serializer = StockSerializer(stock_instance)
        stock_serializer.delete()

        images_instance = product.images
        images_serializer = ProductImageSerializer(images_instance)
        images_serializer.delete()

        # Delete the main Product instance
        product.delete()

        return Response({'message': 'Product and associated data deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    


@api_view(['GET'])
def getProducts(request):
    try:
        products = Product.objects.all()
        serialized_products = ProductSerializer(products, many=True)
        return Response(serialized_products.data)
    except Exception as deletion_error:
        return Response({'error': str(deletion_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def getProduct(request, pk):
    try:
        product = Product.objects.get(id=pk)
        serialized_product = ProductSerializer(product)
        return Response(serialized_product.data)
    except Product.DoesNotExist:
        return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# -----------------------Letter------------------------
@api_view(['POST'])
def createLetter(request):
    try:
        if request.method == 'POST':
            serializer = LetterSerializer(data=request.data)

            try:
                serializer.is_valid(raise_exception=True)
            except Exception as validation_error:
                return Response({'error': str(validation_error)}, status=status.HTTP_400_BAD_REQUEST)

            try:
                serializer.save()
            except Exception as save_error:
                return Response({'error': str(save_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as generic_error:
        return Response({'error': str(generic_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getLetters(request):
    try:
        letters = Letter.objects.all()
        serialized_letters = LetterSerializer(letters, many=True)
        return Response(serialized_letterss.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def getLetter(request, pk):
    try:
        letter = Letter.objects.get(id=pk)
        serialized_letter = LetterSerializer(letter)
        return Response(serialized_letter.data)
    except Letter.DoesNotExist:
        return Response({'error': 'Letter not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# -----------------------Notification------------------------
@api_view(['POST'])
def createNotification(request):
    try:
        if request.method == 'POST':
            serializer = NotificationSerializer(data=request.data)

            try:
                serializer.is_valid(raise_exception=True)
            except Exception as validation_error:
                return Response({'error': str(validation_error)}, status=status.HTTP_400_BAD_REQUEST)

            try:
                serializer.save()
            except Exception as save_error:
                return Response({'error': str(save_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

    except Exception as generic_error:
        return Response({'error': str(generic_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getNotifications(request):
    try:
        notifications = Notification.objects.all()
        serialized_notifications = NotificationSerializer(notifications, many=True)
        return Response(serialized_notifications.data)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def getNotification(request, pk):
    try:
        notification = Notification.objects.get(id=pk)
        serialized_notification = NotificationSerializer(notification)
        return Response(serialized_notification.data)
    except Notification.DoesNotExist:
        return Response({'error': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)