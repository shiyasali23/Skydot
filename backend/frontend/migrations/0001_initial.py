# Generated by Django 5.0 on 2024-02-19 16:41

import django.db.models.deletion
import shortuuid.main
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('adminpanel', '0002_alter_message_id_alter_notification_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('phone_number', models.IntegerField(max_length=10)),
                ('city', models.CharField(max_length=20)),
                ('address', models.TextField()),
                ('pincode', models.CharField(max_length=10)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Subscriber',
            fields=[
                ('id', models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=255)),
                ('phone_number', models.IntegerField(max_length=10, unique=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True)),
                ('tax_price', models.DecimalField(decimal_places=2, max_digits=7)),
                ('shipping_price', models.DecimalField(decimal_places=2, max_digits=7)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=7)),
                ('isWhatsapp', models.BooleanField(default=False)),
                ('payment_method', models.CharField(max_length=50)),
                ('deliveredAt', models.DateTimeField(blank=True, null=True)),
                ('status', models.CharField(choices=[('processing', 'Processing'), ('moved', 'Moved'), ('shipped', 'Shipped'), ('delivered', 'Delivered'), ('cancelled', 'Cancelled'), ('returned', 'Returned'), ('failed', 'Failed')], default='Processing', max_length=20)),
                ('tracking_id', models.CharField(max_length=20)),
                ('note', models.TextField(blank=True, max_length=2000, null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='frontend.customer')),
            ],
            options={
                'ordering': ['-created'],
            },
        ),
        migrations.CreateModel(
            name='OrderProduct',
            fields=[
                ('id', models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True)),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('size', models.CharField(choices=[('XS', 'XS'), ('S', 'S'), ('M', 'M'), ('L', 'L'), ('XL', 'XL')], max_length=10)),
                ('subtotal', models.DecimalField(decimal_places=2, max_digits=7)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('order', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='order_product', to='frontend.order')),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='adminpanel.product')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True)),
                ('body', models.TextField(blank=True, max_length=2000, null=True)),
                ('rating', models.IntegerField(blank=True, choices=[(1, '1'), (2, '2'), (3, '3'), (4, '4'), (5, '5')], null=True)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('orderProduct', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_reviews', to='frontend.orderproduct')),
                ('product', models.ForeignKey(default='abc', on_delete=django.db.models.deletion.CASCADE, related_name='reviews', to='adminpanel.product')),
            ],
        ),
    ]
