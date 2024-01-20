from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from django.db import IntegrityError

from main.serializers import *
from main.models import Customer



@api_view(['POST'])
def registerCustomer(request):
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
    customers = customer.objects.all()
    serialized_customers = CustomerSerializer(customers, many=True)
    return Response(serialized_customers.data)

@api_view(['GET'])
def getCustomer(request, pk):
    customer = Customer.objects.get(id=pk)
    serialized_customer = CustomerSerializer(customer)
    return Response(serialized_customer.data)