from django.conf import settings
from django.db import models
import uuid


class Farm(models.Model):
    AREA_UNIT_CHOICES = [
        ('acre', 'Acre'),
        ('hectare', 'Hectare'),
    ]

    farmer = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='farms'
    )
    farm_name = models.CharField(max_length=100)
    farm_code = models.CharField(max_length=30, unique=True, blank=True)
    area = models.DecimalField(max_digits=10, decimal_places=2)
    area_unit = models.CharField(max_length=10, choices=AREA_UNIT_CHOICES, default='acre')

    state = models.CharField(max_length=100)
    district = models.CharField(max_length=100)
    village = models.CharField(max_length=100, blank=True, null=True)

    latitude = models.DecimalField(max_digits=10, decimal_places=7, blank=True, null=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=7, blank=True, null=True)

    crop_name = models.CharField(max_length=100, blank=True, null=True)
    soil_type = models.CharField(max_length=100, blank=True, null=True)
    sowing_date = models.DateField(blank=True, null=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['farmer', 'farm_name']

    def save(self, *args, **kwargs):
        if not self.farm_code:
            self.farm_code = f"FARM-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.farm_name} - {self.farmer.email}"