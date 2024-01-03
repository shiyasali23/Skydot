from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from django.db import IntegrityError

from main.serializers import *
from main.models import Product

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serialized_products = ProductSerializer(products, many=True)
    return Response(serialized_products.data)

@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(id=pk)
    serialized_product = ProductSerializer(product)
    return Response(serialized_product.data)