from django.urls import path
from .views import register, login, verify_otp

urlpatterns = [
    path('register/', register, name='register'),
    path('verify-otp/', verify_otp, name='verify-otp'),
    path('login/', login, name='login'),
]
