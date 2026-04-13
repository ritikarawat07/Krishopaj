from rest_framework import serializers
from .models import Farm


class FarmCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = [
            'id',
            'farm_name',
            'farm_code',
            'area',
            'area_unit',
            'state',
            'district',
            'village',
            'latitude',
            'longitude',
            'crop_name',
            'soil_type',
            'sowing_date',
            'is_active',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class FarmListSerializer(serializers.ModelSerializer):
    farmer_name = serializers.SerializerMethodField()
    farmer_email = serializers.SerializerMethodField()

    class Meta:
        model = Farm
        fields = [
            'id',
            'farm_name',
            'farm_code',
            'farmer_name',
            'farmer_email',
            'area',
            'area_unit',
            'state',
            'district',
            'village',
            'latitude',
            'longitude',
            'crop_name',
            'soil_type',
            'sowing_date',
            'is_active',
            'created_at',
            'updated_at',
        ]

    def get_farmer_name(self, obj):
        if hasattr(obj.farmer, 'name'):
            return obj.farmer.name
        return getattr(obj.farmer, 'username', None)

    def get_farmer_email(self, obj):
        return obj.farmer.email