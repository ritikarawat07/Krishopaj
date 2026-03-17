from django.urls import path
from django.http import JsonResponse
from .views import (
    SignupRequestOTPView,
    VerifyOTPView,
    SetPasswordAfterSignupView,
    LoginView,
    ForgotPasswordRequestOTPView,
    ResetPasswordView,
)

def accounts_info(request):
    return JsonResponse({
        "message": "Krishopaj Accounts API",
        "version": "1.0.0",
        "endpoints": {
            "signup_request_otp": "/api/accounts/signup/request-otp/",
            "verify_otp": "/api/accounts/otp/verify/",
            "set_password": "/api/accounts/signup/set-password/",
            "login": "/api/accounts/login/",
            "forgot_password_request_otp": "/api/accounts/forgot-password/request-otp/",
            "reset_password": "/api/accounts/forgot-password/reset/",
        }
    })

urlpatterns = [
    path('', accounts_info, name='accounts-info'),
    path('signup/request-otp/', SignupRequestOTPView.as_view(), name='signup-request-otp'),
    path('otp/verify/', VerifyOTPView.as_view(), name='otp-verify'),
    path('signup/set-password/', SetPasswordAfterSignupView.as_view(), name='signup-set-password'),
    path('login/', LoginView.as_view(), name='login'),
    path('forgot-password/request-otp/', ForgotPasswordRequestOTPView.as_view(), name='forgot-password-request-otp'),
    path('forgot-password/reset/', ResetPasswordView.as_view(), name='forgot-password-reset'),
]