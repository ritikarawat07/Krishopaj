import axios from "axios";
import { API_BASE_URL } from "./apiConfig";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for debugging
API.interceptors.request.use(
  (request) => {
    console.log('API Request:', request.baseURL + request.url);
    return request;
  },
  (error) => {
    console.log('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.log('API Response Error:', error.config?.url, error.message);
    if (error.response) {
      console.log('Error Response Data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default API;
