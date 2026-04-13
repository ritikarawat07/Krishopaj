from rest_framework import generics, permissions, status
from rest_framework.response import Response

from .models import Farm
from .serializers import FarmCreateSerializer, FarmListSerializer


class FarmCreateAPIView(generics.CreateAPIView):
    serializer_class = FarmCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(farmer=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        response_serializer = FarmListSerializer(serializer.instance)
        return Response(
            {
                "message": "Farm created successfully",
                "farm": response_serializer.data
            },
            status=status.HTTP_201_CREATED
        )


class FarmListAPIView(generics.ListAPIView):
    serializer_class = FarmListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Farm.objects.filter(farmer=self.request.user, is_active=True)


class FarmDetailAPIView(generics.RetrieveAPIView):
    serializer_class = FarmListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Farm.objects.filter(farmer=self.request.user)


class FarmUpdateAPIView(generics.UpdateAPIView):
    serializer_class = FarmCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Farm.objects.filter(farmer=self.request.user)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        response_serializer = FarmListSerializer(serializer.instance)
        return Response(
            {
                "message": "Farm updated successfully",
                "farm": response_serializer.data
            },
            status=status.HTTP_200_OK
        )


class FarmDeleteAPIView(generics.DestroyAPIView):
    serializer_class = FarmListSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Farm.objects.filter(farmer=self.request.user)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()

        return Response(
            {
                "message": "Farm deleted successfully (soft delete)"
            },
            status=status.HTTP_200_OK
        )