# Generated by Django 3.2.1 on 2023-09-16 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0016_shippingaddress_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='default_price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=12, null=True),
        ),
    ]
