from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from django.db import IntegrityError

from main.serializers import SubscriberSerializer, RegisterSubscriberSerializer

from main.models import Subscriber





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
    subscribers = Guest.objects.all()
    serialized_subscribers = SubscriberSerializer(subscribers, many=True)
    return Response(serialized_subscribers.data)

@api_view(['GET'])
def getSubscriber(request, pk):
    subscriber = Guest.objects.get(id=pk)
    serialized_subscriber = SubscriberSerializer(subscriber)
    return Response(serialized_subscriber.data)