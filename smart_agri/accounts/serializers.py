from rest_framework import serializers
from .models import User
from django.contrib.auth.hashers import make_password
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['name', 'phone', 'password']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = User.objects.create(**validated_data)
        return user
class LoginSerializer(serializers.Serializer):
    phone = serializers.CharField()
    password = serializers.CharField()
class OTPVerifySerializer(serializers.Serializer):
    phone = serializers.CharField()
    otp = serializers.CharField()
