from django.db import models

class Farmer(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
