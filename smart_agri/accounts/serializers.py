from rest_framework import serializers
from .models import FarmerUser


class SignupRequestOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField(max_length=100)
    age = serializers.IntegerField(min_value=1)

    def validate_email(self, value):
        if FarmerUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already registered.")
        return value


class VerifyOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)
    purpose = serializers.ChoiceField(choices=['signup', 'forgot_password'])


class SetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=6)
    name = serializers.CharField(max_length=100)
    age = serializers.IntegerField(min_value=1)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)


class ForgotPasswordRequestOTPSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not FarmerUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email not registered.")
        return value


class ResetPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(write_only=True, min_length=6)