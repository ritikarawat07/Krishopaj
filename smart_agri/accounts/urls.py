from django.urls import path
from .views import (
    SignupRequestOTPView,
    VerifyOTPView,
    SetPasswordAfterSignupView,
    LoginView,
    ForgotPasswordRequestOTPView,
    ResetPasswordView,
)

urlpatterns = [
    path('signup/request-otp/', SignupRequestOTPView.as_view(), name='signup-request-otp'),
    path('otp/verify/', VerifyOTPView.as_view(), name='otp-verify'),
    path('signup/set-password/', SetPasswordAfterSignupView.as_view(), name='signup-set-password'),
    path('login/', LoginView.as_view(), name='login'),
    path('forgot-password/request-otp/', ForgotPasswordRequestOTPView.as_view(), name='forgot-password-request-otp'),
    path('forgot-password/reset/', ResetPasswordView.as_view(), name='forgot-password-reset'),
]