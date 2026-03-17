from django.db import models

class Farm(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=255, blank=True)
    area = models.FloatField(blank=True, null=True)  # size in acres or hectares
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
