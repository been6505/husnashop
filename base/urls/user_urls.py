from django.urls import path
from base.views import user_views as views


urlpatterns = [
    path('register/', views.registerUser, name='register'),
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),

    path('', views.getUsers, name="users"),
    path('profile/', views.getUserProfile, name="user_profile"),
    path('profile/edit/update', views.updateUserProfile,
         name="user_profile_update"),
    path('profile/update/', views.updateUserProfile, name="user_profile_update"),

    path('<str:pk>/', views.getUserById, name="get_user"),

    path('update/<str:pk>/', views.updateUser, name="updateUser"),
    path('delete/<str:pk>/', views.deleteUser, name="deleteUser"),

    # path('coupon',views.getCoupon,name="getCoupon"),

    # path('reset_password/', views.resetPassword,name="resetPassword"),
]
