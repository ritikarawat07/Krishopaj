from django.contrib import admin
from .models import Farm


@admin.register(Farm)
class FarmAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'farm_name', 'farm_code', 'farmer',
        'area', 'area_unit', 'state', 'district',
        'crop_name', 'sowing_date', 'is_active', 'created_at'
    )
    list_filter = ('state', 'district', 'area_unit', 'is_active', 'created_at')
    search_fields = ('farm_name', 'farm_code', 'farmer__email', 'farmer__username')