# Generated by Django 5.0 on 2024-03-01 09:54

import shortuuid.main
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminpanel', '0007_alter_message_id_alter_notification_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='id',
            field=models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='notification',
            name='id',
            field=models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='id',
            field=models.CharField(default=shortuuid.main.ShortUUID.uuid, editable=False, max_length=22, primary_key=True, serialize=False, unique=True),
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
