from django.urls import path
from .views import YieldPredictionView, CropRecommendationAPIView

urlpatterns = [
    path('predict-yield/', YieldPredictionView.as_view(), name='predict-yield'),
    path('crop-recommendation/', CropRecommendationAPIView.as_view(), name='crop-recommendation'),
]