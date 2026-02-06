from django.urls import path
from .views import SendOTP, VerifyOTP

urlpatterns = [
    path('send-otp/', SendOTP.as_view()),
    path('verify-otp/', VerifyOTP.as_view()),
]
