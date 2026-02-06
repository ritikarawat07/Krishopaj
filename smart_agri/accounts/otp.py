import random
from django.core.cache import cache

def send_otp(phone):
    otp = random.randint(100000, 999999)
    cache.set(phone, otp, timeout=300)  # stores OTP for 5 min
    print("OTP:", otp)  # In real app, send via SMS
    return otp

def verify_otp(phone, otp):
    return cache.get(phone) == otp
