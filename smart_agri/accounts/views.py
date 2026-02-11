from django.contrib.auth.hashers import check_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .otp import generate_otp
from .utils import send_otp_sms
from .models import User, OTP
from .serializers import RegisterSerializer


# ✅ Normalize phone number (IMPORTANT)
def normalize_phone(phone):
    if phone and not phone.startswith("+91"):
        phone = "+91" + phone
    return phone


# =========================
# REGISTER
# =========================
@api_view(['POST'])
def register(request):
    print(f"🔍 DEBUG: Register request data: {request.data}")

    data = request.data.copy()
    data['phone'] = normalize_phone(data.get('phone'))

    serializer = RegisterSerializer(data=data)

    if serializer.is_valid():
        user = serializer.save(is_verified=False)

        otp = generate_otp()
        print(f"🔍 DEBUG: Generated OTP: {otp} for phone: {user.phone}")

        # ✅ SAVE OTP FIRST
        otp_obj = OTP.objects.create(
            phone=user.phone,
            otp=otp
        )
        print(f"🔍 DEBUG: OTP saved to database with ID: {otp_obj.id}")

        try:
            sms_response = send_otp_sms(user.phone, otp)
            print(f"🔍 DEBUG: SMS sent successfully: {sms_response}")
        except Exception as e:
            print(f"🔍 DEBUG: SMS failed but OTP saved: {str(e)}")

        return Response({
            "message": "Registration successful. OTP generated."
        }, status=status.HTTP_201_CREATED)

    print(f"🔍 DEBUG: Register serializer errors: {serializer.errors}")
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# SEND OTP (Forgot Password)
# =========================
@api_view(['POST'])
def send_otp(request):
    print(f"🔍 DEBUG: Send OTP request received: {request.data}")

    phone = normalize_phone(request.data.get('phone'))

    if not phone:
        return Response({"error": "Phone number required"}, status=400)

    try:
        user = User.objects.get(phone=phone)

        otp = generate_otp()
        print(f"🔍 DEBUG: Generated OTP for forgot password: {otp} for phone: {phone}")
        print(f"🔍 DEBUG: About to create OTP object...")
        
        # Save OTP
        otp_obj = OTP.objects.create(
            phone=phone,
            otp=otp
        )
        print(f"🔍 DEBUG: OTP object created with ID: {otp_obj.id}")

        try:
            sms_response = send_otp_sms(phone, otp)
            print(f"🔍 DEBUG: SMS sent: {sms_response}")
        except Exception as e:
            print(f"🔍 DEBUG: SMS failed but OTP saved: {str(e)}")

        return Response({"success": True, "message": "OTP sent for password reset"})

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    except Exception as e:
        return Response({"error": f"Failed to send OTP: {str(e)}"}, status=500)


# =========================
# VERIFY OTP
# =========================
@api_view(['POST'])
def verify_otp(request):
    phone = normalize_phone(request.data.get('phone'))
    otp = request.data.get('otp')

    print(f"🔍 DEBUG: Received phone: {phone}, otp: {otp}")

    if not phone or not otp:
        return Response({"error": "Phone and OTP required"}, status=400)

    try:
        print(f"🔍 DEBUG: Looking for OTP with phone: {phone}, otp: {otp}")

        otp_obj = OTP.objects.get(phone=phone, otp=otp)
        print(f"🔍 DEBUG: Found OTP object: {otp_obj}")

        if otp_obj.is_expired():
            print("🔍 DEBUG: OTP is expired")
            otp_obj.delete()
            return Response({"error": "OTP expired"}, status=400)

        user = User.objects.get(phone=phone)
        user.is_verified = True
        user.save()

        # Keep OTP in database (don't delete)
        print("🔍 DEBUG: OTP verified and kept in database")

        return Response({
            "success": True,
            "message": "OTP verified successfully"
        })

    except OTP.DoesNotExist:
        print("🔍 DEBUG: OTP not found in database")
        existing_otps = OTP.objects.filter(phone=phone)
        print(f"🔍 DEBUG: Existing OTPs for {phone}: {list(existing_otps)}")
        return Response({"error": "Invalid OTP"}, status=400)

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    except Exception as e:
        return Response({"error": f"Server error: {str(e)}"}, status=500)


# =========================
# LOGIN
# =========================
@api_view(['POST'])
def update_password(request):
    print(f"🔍 DEBUG: Update password request: {request.data}")
    phone = request.data.get('phone')
    password = request.data.get('password')
    
    if not phone or not password:
        return Response({"error": "Phone and password required"}, status=400)
    
    try:
        user = User.objects.get(phone=phone)
        user.set_password(password)
        user.save()
        print(f"🔍 DEBUG: Password updated for user: {phone}")
        return Response({"success": True, "message": "Password updated successfully"})
        
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    except Exception as e:
        return Response({"error": f"Failed to update password: {str(e)}"}, status=500)


@api_view(['POST'])
def login(request):
    phone = normalize_phone(request.data.get('phone'))
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
                {"success": True, "message": "Login successful"},
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
