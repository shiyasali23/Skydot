
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from django.db import IntegrityError

from main.serializers import *
from main.models import Order, OrderItem




@api_view(['POST'])
def registerOrder(request):
    try:
        if request.method == 'POST':
            serializer = OrderRegisterSerializer(data=request.data)

            try:
                serializer.is_valid(raise_exception=True)
            except serializers.ValidationError as validation_error:
                print(1,validation_error)
                return Response({'error': validation_error.detail}, status=status.HTTP_400_BAD_REQUEST)

            try:
                serializer.save()
            except serializers.ValidationError as save_error:
                print(2,save_error)
                return Response({'error': save_error.detail}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as generic_error:
                print(3,generic_error)
                return Response({'error': str(generic_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            report = {
                'message':'Registration Success',
                'data' : serializer.data
            }
            return Response(report, status=status.HTTP_201_CREATED)

    except Exception as generic_error:
        print(4,generic_error)
        return Response({'error': str(generic_error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def getOrders(request):
    orders = Order.objects.all()
    serialized_orders = OrderSerializer(orders, many=True)
    return Response(serialized_orders.data)

@api_view(['GET'])
def getOrder(request, pk):
    order = Order.objects.get(id=pk)
    serialized_order = OrderSerializer(order)
    return Response(serialized_order.data)



@api_view(['GET'])
def getOrderItems(request):
    order_items = OrderItem.objects.all()
    print(order_items,'hello')
    serialized_order_items = OrderItemSerializer(order_items, many=True)
    return Response(serialized_order_items.data)