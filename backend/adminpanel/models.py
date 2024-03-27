import shortuuid
from django.db import models

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

from django.core.exceptions import ValidationError


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
    ]

    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    name = models.CharField(max_length=25, unique=True, null=False, blank=False)
    description = models.TextField(max_length=2000, null=False, blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=1, null=False, blank=False)
    category = models.CharField(max_length=10, choices=CATEGORY_CHOICES, null=False, blank=False)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, null=False, blank=False)
    tag = models.CharField(max_length=11, choices=TAG_CHOICES, null=True, blank=False)
    vote = models.IntegerField(default=0, null=True, blank=True)
    total_sold = models.IntegerField(default=0, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True)
    out_of_stock = models.BooleanField(default=False)

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-total_sold']

    
class Stock(models.Model):
    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='stock')
    stock_XS = models.IntegerField(default=0, null=False, blank=False)
    stock_S = models.IntegerField(default=0, null=False, blank=False)
    stock_M = models.IntegerField(default=0, null=False, blank=False)
    stock_L = models.IntegerField(default=0, null=False, blank=False)
    stock_XL = models.IntegerField(default=0, null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True, null=False, blank=False)

    def __str__(self):
        return self.product.name
    
    def save(self, *args, **kwargs):
        try:
            if all([
                self.stock_XS == 0,
                self.stock_S == 0,
                self.stock_M == 0,
                self.stock_L == 0,
                self.stock_XL == 0
            ]):
                self.product.out_of_stock = True
            else:
                self.product.out_of_stock = False
            self.product.save()
            super(Stock, self).save(*args, **kwargs)  
        except Exception as e:
            print(e)
            raise ValidationError(f"Cant update Stock: {str(e)}")

    
    
class ProductImage(models.Model):
    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    product = models.OneToOneField(Product, on_delete=models.CASCADE,related_name='images')
    main_image = models.ImageField(null=False, blank=False)
    sub_image_1 = models.ImageField(null=False, blank=False)
    sub_image_2 = models.ImageField(null=False, blank=False)
    sub_image_3 = models.ImageField(null=False, blank=False)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.product.name


class Message(models.Model):
    TO_CHOICES = [
        ('all', 'ALL'),
        ('admin', 'ADMIN'),
        ('customer','CUSTOMER')
    ]
    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)
    body = models.TextField(max_length=2000, null=False, blank=False)
    phone_number = models.IntegerField(null=True, blank=True) 
    to = models.CharField(max_length=8, choices=TO_CHOICES, null=True, blank=True)  
    seen = models.BooleanField(default=False, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)

    def __str__(self):
        return self.body
    
    class Meta:
        ordering = ["-created"]


