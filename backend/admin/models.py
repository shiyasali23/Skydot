import shortuuid
from django.db import models

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from frontend.models import Subscriber

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('shirt', 'Shirt'),
        ('t-shirt', 'T-shirt'),
        ('pants', 'Pants'),
    ]

    GENDER_CHOICES = [
        ('men', 'Men'),
        ('women', 'Women'),
        ('unisex', 'Unisex'),
    ]

    TAG_CHOICES = [
        ('featured', 'Featured'),
        ('new-arrival', 'New Arrival'),
        ('new-arrival', 'New Arrival'),
        ('up-comming', 'UP Comming'),
    ]

    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    name = models.CharField(max_length=200,unique=True, null=False, blank=False)
    description = models.TextField(max_length=2000, null=False, blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=1, null=False, blank=False)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, null=False, blank=False)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=False, blank=False)
    tag = models.CharField(max_length=10, choices=TAG_CHOICES, null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)
    out_of_stock = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Stock(models.Model):
    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    product = models.OneToOneField(Product, on_delete=models.CASCADE,related_name='stock')
    stock_XS = models.IntegerField(default=0)
    stock_S = models.IntegerField(default=0)
    stock_M = models.IntegerField(default=0)
    stock_L = models.IntegerField(default=0)
    stock_XL = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product

class ProductImage(models.Model):
    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    product = models.OneToOneField(Product, on_delete=models.CASCADE,related_name='images')
    main_image = models.ImageField(null=False, blank=False)
    sub_image_1 = models.ImageField(null=False, blank=False)
    sub_image_2 = models.ImageField(null=False, blank=False)
    sub_image_3 = models.ImageField(null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product




class Notification(models.Model):
    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    body = models.TextField(max_length=2000, null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body

class Letter(models.Model):
    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    body = models.TextField(max_length=2000, null=False, blank=False)
    receiver = models.ManyToManyField (Subscriber, on_delete=models.SET_NULL, null=False, blank=False, related_name='letters_received')
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body