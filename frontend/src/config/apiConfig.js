export const API_BASE_URL = "http://192.168.1.8:8000/api";

export const API_ENDPOINTS = {
  REGISTER: "/accounts/register/",
  VERIFY_OTP_AND_SET_PASSWORD: "/accounts/verify-otp-and-set-password/",
  LOGIN: "/accounts/login/",
  FORGOT_PASSWORD: "/accounts/forgot-password/",
  RESET_PASSWORD: "/accounts/reset-password/",
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
};