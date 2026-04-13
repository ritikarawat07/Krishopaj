from django.urls import path
from .views import (
    FarmCreateAPIView,
    FarmListAPIView,
    FarmDetailAPIView,
    FarmUpdateAPIView,
    FarmDeleteAPIView,
)

urlpatterns = [
    path('create/', FarmCreateAPIView.as_view(), name='farm-create'),
    path('list/', FarmListAPIView.as_view(), name='farm-list'),
    path('<int:pk>/', FarmDetailAPIView.as_view(), name='farm-detail'),
    path('<int:pk>/update/', FarmUpdateAPIView.as_view(), name='farm-update'),
    path('<int:pk>/delete/', FarmDeleteAPIView.as_view(), name='farm-delete'),
]