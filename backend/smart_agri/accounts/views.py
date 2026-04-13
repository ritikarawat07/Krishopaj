from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

from .models import FarmerUser, EmailOTP
from .serializers import (
    SignupRequestOTPSerializer,
    VerifyOTPSerializer,
    SetPasswordSerializer,
    LoginSerializer,
    ForgotPasswordRequestOTPSerializer,
    ResetPasswordSerializer,
)
from .utils import generate_otp, send_otp_email
class SignupRequestOTPView(APIView):
    def post(self, request):
        serializer = SignupRequestOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']

            otp = generate_otp()

            EmailOTP.objects.filter(email=email, purpose='signup').delete()

            EmailOTP.objects.create(
                email=email,
                otp=otp,
                purpose='signup'
            )

            send_otp_email(email, otp)

            return Response({
                "message": "OTP sent to email successfully."
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class VerifyOTPView(APIView):
    def post(self, request):
        serializer = VerifyOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']
            purpose = serializer.validated_data['purpose']

            try:
                otp_obj = EmailOTP.objects.filter(
                    email=email,
                    purpose=purpose
                ).latest('created_at')
            except EmailOTP.DoesNotExist:
                return Response({"error": "OTP not found."}, status=status.HTTP_404_NOT_FOUND)

            if otp_obj.is_expired():
                return Response({"error": "OTP expired."}, status=status.HTTP_400_BAD_REQUEST)

            if otp_obj.otp != otp:
                return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)

            otp_obj.is_verified = True
            otp_obj.save()

            return Response({
                "message": "OTP verified successfully."
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SetPasswordAfterSignupView(APIView):
    def post(self, request):
        serializer = SetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            name = serializer.validated_data['name']
            age = serializer.validated_data['age']
            otp = serializer.validated_data.get('otp')  # Get OTP from request

            try:
                # First try to find a verified OTP
                otp_obj = EmailOTP.objects.filter(
                    email=email,
                    purpose='signup',
                    is_verified=True
                ).latest('created_at')
                print(f"Found verified OTP: {otp_obj.otp}")
            except EmailOTP.DoesNotExist:
                # If no verified OTP, try to verify the provided OTP
                if not otp:
                    print(f"No verified OTP found and no OTP provided for {email}")
                    return Response({"error": "Email not verified by OTP."}, status=status.HTTP_400_BAD_REQUEST)
                
                try:
                    otp_obj = EmailOTP.objects.filter(
                        email=email,
                        purpose='signup'
                    ).latest('created_at')
                    
                    if otp_obj.is_expired():
                        return Response({"error": "OTP expired."}, status=status.HTTP_400_BAD_REQUEST)
                    
                    if otp_obj.otp != otp:
                        return Response({"error": "Invalid OTP."}, status=status.HTTP_400_BAD_REQUEST)
                    
                    # Mark as verified
                    otp_obj.is_verified = True
                    otp_obj.save()
                    print(f"OTP {otp} verified and marked as verified")
                    
                except EmailOTP.DoesNotExist:
                    return Response({"error": "OTP not found."}, status=status.HTTP_404_NOT_FOUND)

            if FarmerUser.objects.filter(email=email).exists():
                return Response({"error": "User already exists."}, status=status.HTTP_400_BAD_REQUEST)

            user = FarmerUser.objects.create_user(
                email=email,
                name=name,
                age=age,
                password=password,
                is_email_verified=True
            )

            refresh = RefreshToken.for_user(user)

            otp_obj.delete()

            return Response({
                "message": "Signup completed successfully.",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                    "age": user.age,
                }
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = authenticate(request, email=email, password=password)

            if user is None:
                return Response({"error": "Invalid email or password."}, status=status.HTTP_401_UNAUTHORIZED)

            refresh = RefreshToken.for_user(user)

            return Response({
                "message": "Login successful.",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                    "age": user.age,
                }
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ForgotPasswordRequestOTPView(APIView):
    def post(self, request):
        serializer = ForgotPasswordRequestOTPSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']

            otp = generate_otp()

            EmailOTP.objects.filter(email=email, purpose='forgot_password').delete()

            EmailOTP.objects.create(
                email=email,
                otp=otp,
                purpose='forgot_password'
            )

            send_otp_email(email, otp)

            return Response({
                "message": "OTP sent to email successfully."
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            new_password = serializer.validated_data['new_password']

            try:
                otp_obj = EmailOTP.objects.filter(
                    email=email,
                    purpose='forgot_password',
                    is_verified=True
                ).latest('created_at')
            except EmailOTP.DoesNotExist:
                return Response({"error": "Email not verified by OTP."}, status=status.HTTP_400_BAD_REQUEST)

            try:
                user = FarmerUser.objects.get(email=email)
            except FarmerUser.DoesNotExist:
                return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

            user.set_password(new_password)
            user.save()

            refresh = RefreshToken.for_user(user)

            otp_obj.delete()

            return Response({
                "message": "Password reset successful.",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name": user.name,
                    "age": user.age,
                }
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)