from twilio.rest import Client
from django.conf import settings

def send_otp_sms(to_phone, otp):
    print("SID USED:", settings.TWILIO_ACCOUNT_SID)

        # Use API Key if available, otherwise use Account SID
    if hasattr(settings, 'TWILIO_API_KEY') and settings.TWILIO_API_KEY:
        client = Client(
            settings.TWILIO_API_KEY,
            settings.TWILIO_API_SECRET,
            account_sid=settings.TWILIO_ACCOUNT_SID
        )
    else:
        client = Client(
            settings.TWILIO_ACCOUNT_SID,
            settings.TWILIO_AUTH_TOKEN
        )

    message = client.messages.create(
        body=f"Your Krishopaj OTP is {otp}. Valid for 5 minutes.",
        from_=settings.TWILIO_PHONE_NUMBER,
        to=to_phone
    )

    return message.sid
