import shortuuid
from django.db import models

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType



class Customer(models.Model):
    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    name = models.CharField(max_length=255, null=False, blank=False)
    email = models.EmailField(null=False, blank=False)
    phone_number = models.CharField(max_length=15, null=False, blank=False)
    city = models.CharField(max_length=20, null=False, blank=False)
    address = models.TextField(null=False, blank=False)
    pincode = models.CharField(max_length=10, null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name






class Order(models.Model):   
    STATUS_CHOICES = [
        ('processing', 'Processing'),
        ('moved', 'Moved'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
        ('returned', 'Returned'),
    ]

    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    owner = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=False) 
    tax_price = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    shipping_price = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    total_price = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    isWhatsapp = models.BooleanField(default=False)
    payment_method = models.CharField(max_length=50, null=False, blank=False)
    deliveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Processing', null=False, blank=False)
    tracking_id = models.CharField(max_length=20, null=False, blank=False)
    note = models.TextField(max_length=2000, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        order = f"{str(self.tracking_id)}-{str(self.owner)}"
        return order

    class Meta:
        ordering = ['-created']


class OrderItem(models.Model):
    SIZE_CHOICES = [
        ('XS', 'XS'),
        ('S', 'S'),
        ('M', 'M'),
        ('L', 'L'),
        ('XL', 'XL'),
    ]

    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=False, blank=False, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, blank=True)
    quantity = models.PositiveIntegerField(null=False, blank=False, default=1)
    size = models.CharField(max_length=10, choices=SIZE_CHOICES, null=False, blank=False)
    subtotal = models.DecimalField(max_digits=7, decimal_places=2, null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        item = f"{self.product} {self.size} {self.quantity} "
        return item



class Review(models.Model):
    RATING_CHOICES = [
        (1, '1'),
        (2, '2'),
        (3, '3'),
        (4, '4'),
        (5, '5'),
    ]

    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=False, blank=False, related_name='order_reviews')
    body = models.TextField(max_length=2000, null=True, blank=True)
    rating = models.IntegerField(choices=RATING_CHOICES, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body


class Subscriber(models.Model):
    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    name = models.CharField(max_length=255, null=False, blank=False)
    phone_number = models.CharField(max_length=15, null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.phone_number



# order = {
#     'name':name,
#     'phone_number':phone_number,
#     'email':email,
#     'pincode':pincode,
#     'address':address,

#     'taxPrice':taxPrice,
#     'shippingPrice':shippingPrice,
#     'totalPrice':totalPrice,
#     'payment_method':payment_method,
#     'isDelivered':False,
#     'deliveredAt': None,
#     'status':Processing,
#     'tracking_id':phone_number,
#     'owner':owner.id,
#     'order_items':[
#         {
#         'product':product.id,
#         'size':size,
#         'quantity':quantity
#         },
#         {
#         'product':product.id,
#         'size':size,
#         'quantity':quantity
#         },
#         {
#         'product':product.id,
#         'size':size,
#         'quantity':quantity
#         },
    
#     ]
# }
