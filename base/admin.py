from django.contrib import admin
from .models import *
# from .models import Post
# Register your models here.
# admin.site.register(Product)
# admin.site.register(Review)
# admin.site.register(OrderItem)
# admin.site.register(ShippingAddress)

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [
        "user","createdAt","totalPrice","isPaid","isDeliver"
    ]
    list_per_page=10
    list_editable=["isPaid","isDeliver"]
    search_fields=["user"]
   
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display=[
        "order","name","qty","price"
    ]
    list_per_page=10
    search_fields=["name"]

   
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = [
        "product","name","rating"
    ]
    list_per_page=10
    list_filter=["rating"]
   
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [
        "name","brand","category","price","countInStock","createdAt","rating"
    ]
    list_per_page=10
    list_filter=["category","brand"]
    search_fields=["name"]
    
@admin.register(ShippingAddress)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display=[
       "user", "address","subCity","city","provice","postalCode","country"
    ]
    list_filter=["country","provice"]
    search_fields=["address"]
    
    
@admin.register(Coupon)
class ShippingAddressAdmin(admin.ModelAdmin):
    list_display=[
        "coupon_code","discount_price","is_exprired","minimum_amount"
    ]
    list_filter=["coupon_code"]
    search_fields=["coupon_code"]