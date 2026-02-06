from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class SendOTP(APIView):
    def post(self, request):
        return Response(
            {"message": "OTP sent successfully"},
            status=status.HTTP_200_OK
        )

class VerifyOTP(APIView):
    def post(self, request):
        return Response(
            {"message": "OTP verified successfully"},
            status=status.HTTP_200_OK
        )
