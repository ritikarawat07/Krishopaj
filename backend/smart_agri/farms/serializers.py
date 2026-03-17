from rest_framework import serializers

class FarmCreateSerializer(serializers.Serializer):
    crop = serializers.CharField(max_length=100)
    area = serializers.FloatField()
    soil_type = serializers.CharField(max_length=50)
    sowing_date = serializers.DateField()
