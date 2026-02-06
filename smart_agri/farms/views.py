from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from datetime import datetime

from .repository import farm_collection
from .serializers import FarmCreateSerializer

class CreateFarm(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = FarmCreateSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        data = serializer.validated_data

        farm_collection.insert_one({
            "farmer_id": request.user.id,
            "crop": data["crop"],
            "area_acre": data["area"],
            "soil_type": data["soil_type"],
            "sowing_date": data["sowing_date"].isoformat(),
            "created_at": datetime.utcnow()
        })

        return Response({"message": "Farm created successfully"})
