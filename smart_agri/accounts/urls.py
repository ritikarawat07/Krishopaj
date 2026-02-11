from django.urls import path
from .views import register, login, verify_otp, send_otp, update_password

urlpatterns = [
    path('register/', register, name='register'),
    path('verify-otp/', verify_otp, name='verify-otp'),
    path('login/', login, name='login'),
    path('send-otp/', send_otp, name='send-otp'),
    path('update-password/', update_password, name='update-password'),
]
