export const API_BASE_URL = "http://192.168.1.8:8000/api";

// Alternative: Try localhost if the above doesn't work
// export const API_BASE_URL = "http://localhost:8000/api";

export const API_ENDPOINTS = {
  SIGNUP_REQUEST_OTP: "/accounts/signup/request-otp/",
  VERIFY_OTP: "/accounts/otp/verify/",
  SET_PASSWORD: "/accounts/signup/set-password/",
  LOGIN: "/accounts/login/",
  FORGOT_PASSWORD_REQUEST_OTP: "/accounts/forgot-password/request-otp/",
  RESET_PASSWORD: "/accounts/forgot-password/reset/",
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
};