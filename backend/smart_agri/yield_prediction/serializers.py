from rest_framework import serializers

class YieldPredictionSerializer(serializers.Serializer):
    state = serializers.CharField()
    district = serializers.CharField()
    crop = serializers.CharField()
    year = serializers.IntegerField()
    season = serializers.CharField()
    area = serializers.FloatField()

class CropRecommendationSerializer(serializers.Serializer):
    N = serializers.FloatField()
    P = serializers.FloatField()
    K = serializers.FloatField()
    temperature = serializers.FloatField()
    humidity = serializers.FloatField()
    ph = serializers.FloatField()
    rainfall = serializers.FloatField()