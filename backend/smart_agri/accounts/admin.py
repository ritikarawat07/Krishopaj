from django.contrib import admin
from .models import FarmerUser, EmailOTP

admin.site.register(FarmerUser)
admin.site.register(EmailOTP)