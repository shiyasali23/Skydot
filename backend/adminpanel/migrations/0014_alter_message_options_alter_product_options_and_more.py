# Generated by Django 5.0 on 2024-03-31 19:11

import shortuuid.main
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminpanel', '0013_product_total_sold_alter_message_id_alter_product_id_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='message',
            options={'ordering': ['-created']},
        ),
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['-total_sold']},
        ),
        migrations.RemoveField(
            model_name='product',
            name='gender',
        ),
        migrations.AlterField(
            model_name='message',
            name='id',
            field=models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='id',
            field=models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='name',
            field=models.CharField(max_length=25, unique=True),
        ),
        migrations.AlterField(
            model_name='productimage',
            name='id',
            field=models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='stock',
            name='id',
            field=models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True),
        ),
    ]