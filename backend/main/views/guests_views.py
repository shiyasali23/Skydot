from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from django.db import IntegrityError

from main.serializers import *
from main.models import Guest







@api_view(['POST'])
def registerGuest(request):
    try:
        if request.method == 'POST':
            serializer = RegisterGuestSerializer(data=request.data)

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
def getGuests(request):
    guests = Guest.objects.all()
    serialized_guests = GuestSerializer(guests, many=True)
    return Response(serialized_guests.data)

@api_view(['GET'])
def getGuest(request, pk):
    guest = Guest.objects.get(id=pk)
    serialized_guest = GuestSerializer(guest)
    return Response(serialized_guest.data)