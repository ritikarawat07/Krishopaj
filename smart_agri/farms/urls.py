from django.urls import path
from .views import CreateFarm

urlpatterns = [
    path('create/', CreateFarm.as_view(), name='create-farm'),
]
