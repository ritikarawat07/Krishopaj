import os
import joblib
import pandas as pd
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import YieldPredictionSerializer
from .serializers import CropRecommendationSerializer

# Load model once when server starts
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'ml', 'yield_model.pkl')
CROP_MODEL_PATH = os.path.join(BASE_DIR, 'ml', 'crop_model.pkl')

yield_model = None
crop_model = None


def get_yield_model():
    global yield_model
    if yield_model is None:
        yield_model = joblib.load(MODEL_PATH)
    return yield_model


def get_crop_model():
    global crop_model
    if crop_model is None:
        crop_model = joblib.load(CROP_MODEL_PATH)
    return crop_model


class YieldPredictionView(APIView):
    permission_classes = []  # No authentication required

    def post(self, request):
        serializer = YieldPredictionSerializer(data=request.data)

        if serializer.is_valid():
            data = serializer.validated_data

            # Create input dataframe
            input_data = pd.DataFrame([{
                'State': data['state'],
                'District': data['district'],
                'Crop': data['crop'],
                'Year': data['year'],
                'Season': data['season'],
                'Area': data['area']
            }])

            # Predict 
            model = get_yield_model()
            prediction = model.predict(input_data)[0]

            return Response({
                "message": "Yield predicted successfully",
                "predicted_yield": round(float(prediction), 2)
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CropRecommendationAPIView(APIView):
    def post(self, request):
        serializer = CropRecommendationSerializer(data=request.data)

        if serializer.is_valid():
            validated_data = serializer.validated_data

            input_data = pd.DataFrame([validated_data])

            model = get_crop_model()
            prediction = model.predict(input_data)[0]

            return Response({
                "message": "Crop recommended successfully",
                "recommended_crop": prediction
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)