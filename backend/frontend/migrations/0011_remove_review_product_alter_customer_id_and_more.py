# Generated by Django 5.0 on 2024-03-30 00:35

import django.db.models.deletion
import shortuuid.main
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0010_alter_customer_id_alter_order_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='product',
        ),
        migrations.AlterField(
            model_name='customer',
            name='id',
            field=models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='created',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='order',
            name='id',
            field=models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='orderproduct',
            name='id',
            field=models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='review',
            name='id',
            field=models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='review',
            name='orderProduct',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_product_reviews', to='frontend.orderproduct'),
        ),
        migrations.AlterField(
            model_name='subscriber',
            name='id',
            field=models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True),
        ),
    ]