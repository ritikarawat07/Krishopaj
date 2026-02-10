from django.contrib.auth.hashers import check_password

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .otp import generate_otp
from .utils import send_otp_sms
from .models import User, OTP
from .serializers import RegisterSerializer


@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save(is_verified=False)

        otp = generate_otp()

        try:
            sms_response = send_otp_sms(user.phone, otp)

            OTP.objects.create(
                phone=user.phone,
                otp=otp
            )

            return Response({
                "message": "Registration successful. OTP sent to phone."
                # do not return sms_response in production
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                "error": "OTP sending failed",
                "details": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def verify_otp(request):
    phone = request.data.get('phone')
    otp = request.data.get('otp')
    
    print(f"🔍 DEBUG: Received phone: {phone}, otp: {otp}")
    
    if not phone or not otp:
        print("🔍 DEBUG: Missing phone or otp")
        return Response({"error": "Phone and OTP required"}, status=400)

    try:
        print(f"🔍 DEBUG: Looking for OTP with phone: {phone}, otp: {otp}")
        otp_obj = OTP.objects.get(phone=phone, otp=otp)
        print(f"🔍 DEBUG: Found OTP object: {otp_obj}")

        if otp_obj.is_expired():
            print("🔍 DEBUG: OTP is expired")
            otp_obj.delete()
            return Response({"error": "OTP expired"}, status=400)

        print(f"🔍 DEBUG: Looking for user with phone: {phone}")
        user = User.objects.get(phone=phone)
        print(f"🔍 DEBUG: Found user: {user}, current is_verified: {user.is_verified}")
        
        user.is_verified = True
        user.save()
        print(f"🔍 DEBUG: Updated user is_verified to: {user.is_verified}")

        otp_obj.delete()
        print("🔍 DEBUG: Deleted OTP object")

        return Response({"message": "OTP verified successfully"})

    except OTP.DoesNotExist:
        print("🔍 DEBUG: OTP not found in database")
        # Let's check what OTPs exist for this phone
        existing_otps = OTP.objects.filter(phone=phone)
        print(f"🔍 DEBUG: Existing OTPs for {phone}: {list(existing_otps)}")
        return Response({"error": "Invalid OTP"}, status=400)
    except User.DoesNotExist:
        print(f"🔍 DEBUG: User with phone {phone} not found")
        return Response({"error": "User not found"}, status=404)
    except Exception as e:
        print(f"🔍 DEBUG: Unexpected error: {str(e)}")
        return Response({"error": f"Server error: {str(e)}"}, status=500)


@api_view(['POST'])
def login(request):
    phone = request.data.get('phone')
    password = request.data.get('password')

    if not phone or not password:
        return Response(
            {"error": "Phone and password required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(phone=phone)

        if not user.is_verified:
            return Response(
                {"error": "Account not verified"},
                status=status.HTTP_403_FORBIDDEN
            )

        if check_password(password, user.password):
            return Response(
                {"message": "Login successful"},
                status=status.HTTP_200_OK
            )

        return Response(
            {"error": "Invalid password"},
            status=status.HTTP_400_BAD_REQUEST
        )

    except User.DoesNotExist:
        return Response(
            {"error": "User not found"},
            status=status.HTTP_404_NOT_FOUND
        )
