from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from django.db import IntegrityError, transaction
from rest_framework.permissions import IsAdminUser


from .serializers import *
from .models import *




# -------------Customer-------------------------------


@api_view(['POST'])
def createCustomer(request):
    if request.method == 'POST':
        try:
            serializer = CustomerSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data['id'], status=status.HTTP_201_CREATED)          
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(['GET'])
def getCustomers(request):
    try:
        customers = Customer.objects.all()
        serialized_customers = CustomerSerializer(customers, many=True)
        return Response(serialized_customers.data)
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getCustomer(request, pk):
    try:
        customer = Customer.objects.get(id=pk)
        serialized_customer = CustomerSerializer(customer)
        return Response(serialized_customer.data)
    except Customer.DoesNotExist as e:
        print(e)
        return Response(str(e), status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# -----------------------------Order--------------------------------
@api_view(['POST'])
def createOrder(request):
    if request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

              

@api_view(['PUT'])
def updateOrder(request, pk):
    if request.method == 'PUT':
        try:
            order = Order.objects.get(id=pk)
            serializer = OrderSerializer(order, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Order.DoesNotExist as e:
            return Response({'error': str(e)}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['GET'])
def getOrder(request, pk):
    try:
        order = Order.objects.get(tracking_id=pk)
        serialized_order = OrderSerializer(order)
        return Response(serialized_order.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist as e:
        print(e)
        return Response(str(e), status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        data = {
            'error' : str(e),
            'message': "Internal server error"
        }
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOrders(request):
    try:
        orders = Order.objects.all()
        serialized_orders = OrderSerializer(orders, many=True)
        return Response(serialized_orders.data)
    except Exception as e:
        print(e)
        data = {
            'error' : str(e),
            'message': "Internal server error"
        }
        return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


#-----------------------OrderProduct-------------------------




@api_view(['POST'])
def createOrderProduct(request):
    if request.method == 'POST':
        try:
            with transaction.atomic():
                serializer = OrderProductSerializer(data=request.data, many=True)
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
        



@api_view(['GET'])
def getOrderProducts(request):
    try:
        order_products = OrderProduct.objects.all()
        serialized_order_products = OrderProductSerializer(order_products, many=True)
        return Response(serialized_order_products.data)
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def getOrderProduct(request, pk):
    try:
        order_product = OrderProduct.objects.get(id=pk)
        serialized_order_product = OrderProductSerializer(order_product)
        return Response(serialized_order_product.data, status=status.HTTP_200_OK)
    except OrderProduct.DoesNotExist:
        print(e)
        return Response("OrderProduct not found", status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        



# ------------------------Review-------------------------------



@api_view(['POST'])
def createReview(request):
    if request.method == 'POST':
        try:
     
            serializer = ReviewSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)           
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

   


@api_view(['GET'])
def getReviews(request):
    try:
        reviews = Review.objects.all()
        serialized_reviews = ReviewSerializer(reviews, many=True)
        return Response(serialized_reviews.data, status=status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getReview(request, pk):
    try:
        review = Review.objects.get(id=pk)
        serialized_review = ReviewSerializer(review)
        return Response(serialized_review.data, status=status.HTTP_200_OK)
    except Review.DoesNotExist as e:
        print(e)
        return Response(str(e), status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ------------------------Subscriber-------------------------------


@api_view(['POST'])
def createSubscriber(request):
    if request.method == 'POST':
        try:
        
            serializer = SubscriberSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getSubscribers(request):
    try:
        subscribers = Guest.objects.all()
        serialized_subscribers = SubscriberSerializer(subscribers, many=True)
        return Response(serialized_subscribers.data)
    except Exception as e:
        print(e)
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def getSubscriber(request, pk):
    try:
        subscriber = Guest.objects.get(id=pk)
        serialized_subscriber = SubscriberSerializer(subscriber)
        return Response(serialized_subscriber.data,status=status.HTTP_200_OK)
    except Subscriber.DoesNotExist:
        print(Subscriber.DoesNotExist)
        return Response(str(e), status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



