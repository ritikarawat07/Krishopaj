from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def api_info(request):
    return JsonResponse({
        "message": "Krishopaj API is running",
        "version": "1.0.0",
        "endpoints": {
            "accounts": "/api/accounts/",
            "admin": "/admin/"
        }
    })

urlpatterns = [
    path('', api_info, name='api-info'),
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
]
