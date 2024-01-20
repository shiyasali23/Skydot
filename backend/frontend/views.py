from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from django.db import IntegrityError

from .serializers import *
from .models import *




# -------------Customer-------------------------------


@api_view(['POST'])
def createCustomer(request):
    try:
        if request.method == 'POST':
            serializer = RegisterCustomerSerializer(data=request.data)

            try:
                serializer.is_valid(raise_exception=True)
            except Exception as validation_error:
                print(1,validation_error)
                return Response({'error': str(validation_error)}, status=status.HTTP_400_BAD_REQUEST)

            try:
                serializer.save()
            except Exception as save_error:
                print(2,save_error)
                return Response({'error': str(save_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            data = {
                'message':'Registration Success',
                'data' : serializer.data
            }
            return Response(data, status=status.HTTP_201_CREATED)

    except Exception as generic_error:
        print(3,generic_error)
        return Response({'error': str(generic_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['GET'])
def getCustomers(request):
    try:
        customers = customer.objects.all()
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
        return Response({"error": "Id not valid"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# -----------------------------Order--------------------------------



@api_view(['POST'])
def createOrder(request):
    try:
        if request.method == 'POST':
            serializer = CreateOrderSerializer(data=request.data)

            try:
                serializer.is_valid(raise_exception=True)
            except serializers.ValidationError as validation_error:
                data = {
                    'message': validation_error.detail
                }
                return Response(data, status=status.HTTP_400_BAD_REQUEST)

            try:
                serializer.save()
            except serializers.ValidationError as save_error:
                data = {
                    'message': save_error.detail
                }
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            except Exception as generic_error:
                data = {
                    'message': "Error saving order: {}".format(str(generic_error))
                }
                return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            data = {
                'message': 'Order Created',
                'data': serializer.data
            }
            print(data)
            return Response(data, status=status.HTTP_201_CREATED)

    except Exception as generic_error:
        print(generic_error)
        traceback.print_exc()
        return Response({'error': str(generic_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['PUT'])
def updateOrder(request, order_id):
    try:
        order = Order.objects.get(id=order_id)

        if request.method in ['PUT']:
            serializer = OrderSerializer(order, data=request.data, partial=True)

            try:
                serializer.is_valid(raise_exception=True)
            except serializers.ValidationError as validation_error:
                data = {
                    'message': validation_error.detail
                }
                return Response(data, status=status.HTTP_400_BAD_REQUEST)

            try:
                serializer.save()
            except serializers.ValidationError as save_error:
                data = {
                    'message': save_error
                }
                return Response(data, status=status.HTTP_400_BAD_REQUEST)
            except Exception as generic_error:
                data = {
                    'message': generic_error
                }
                return Response(data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            data = {
                'message': 'Order Updated',
                'data': serializer.data
            }
            return Response(data, status=status.HTTP_200_OK)

    except Exception as generic_error:
        return Response({'error': str(generic_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getOrder(request, pk):
    try:
        order = Order.objects.get(tracking_id=pk)
        serialized_order = OrderSerializer(order)
        return Response(serialized_order.data, status=status.HTTP_200_OK)
    except Order.DoesNotExist as e:
        print(e)
        return Response({"error": "Tracking Id not valid"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getOrders(request):
    try:
        orders = Order.objects.all()
        serialized_orders = OrderSerializer(orders, many=True)
        return Response(serialized_orders.data)
    except Exception as e:
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)





# ------------------------Review-------------------------------



@api_view(['POST'])
def createReview(request):
    try:
        if request.method == 'POST':
            serializer = CreateReviewSerializer(data=request.data)

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

            report = {
                'message': 'Review Created Successfully',
                'data': serializer.data
            }
            return Response(report, status=status.HTTP_201_CREATED)

    except Exception as generic_error:
        print(3, generic_error)
        return Response({'error': str(generic_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getReviews(request):

    try:
        reviews = Review.objects.all()
        serialized_reviews = CreateReviewSerializer(reviews, many=True)
        return Response(serialized_reviews.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getReview(request, pk):
    try:
        review = Review.objects.get(id=pk)
        serialized_review = CreateReviewSerializer(review)
        return Response(serialized_review.data, status=status.HTTP_200_OK)
    except Review.DoesNotExist:
        return Response({'error': 'Review not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# ------------------------Subscriber-------------------------------


@api_view(['POST'])
def registerSubscriber(request):
    try:
        if request.method == 'POST':
            serializer = RegisterSubscriberSerializer(data=request.data)

            try:
                serializer.is_valid(raise_exception=True)
            except Exception as validation_error:
                print(1,validation_error)
                return Response({'error': str(validation_error)}, status=status.HTTP_400_BAD_REQUEST)

            try:
                serializer.save()
            except Exception as save_error:
                print(2,save_error)
                return Response({'error': str(save_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            report = {
                'message':'Registration Success',
                'data' : serializer.data
            }
            return Response(report, status=status.HTTP_201_CREATED)

    except Exception as generic_error:
        print(3,generic_error)
        return Response({'error': str(generic_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




@api_view(['GET'])
def getSubscribers(request):
    try:
        subscribers = Guest.objects.all()
        serialized_subscribers = SubscriberSerializer(subscribers, many=True)
        return Response(serialized_subscribers.data)
    except Exception as e:
        return Response(str(e), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def getSubscriber(request, pk):
    subscriber = Guest.objects.get(id=pk)
    serialized_subscriber = SubscriberSerializer(subscriber)
    return Response(serialized_subscriber.data)