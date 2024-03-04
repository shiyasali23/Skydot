from frontend.models import Customer, Order, OrderProduct, Review, Subscriber
from adminpanel.models import Product, Stock, ProductImage, Message

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def popular_Product(request):
    # Retrieve all order products
    order_products = OrderProduct.objects.all()
    
    # Dictionary to store product sales count
    product_sales_count = {}
    
    # Iterate through each order product and calculate sales count
    for order_product in order_products:
        product = order_product.product
        quantity = order_product.quantity        
        if product in product_sales_count:
            product_sales_count[product] += quantity
        else:
            product_sales_count[product] = quantity
    
    # Sort products by sales count in descending order
    sorted_products = sorted(product_sales_count.items(), key=lambda x: x[1], reverse=True)
    
    # Prepare response data
    response_data = []
    for product, sales_count in sorted_products:
        response_data.append({
            'product_name': product.name,
            'sales_count': sales_count
        })
    
    return Response(response_data)
        
        