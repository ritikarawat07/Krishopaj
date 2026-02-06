// Django backend API configuration
export const API_BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  // Farmer endpoints
  FARMERS: '/farmers',
  FARM_INFO: '/farmers/farm-info',
  
  // Sensor endpoints
  SENSORS: '/sensors',
  SENSOR_DATA: '/sensors/data',
  
  // Media endpoints
  MEDIA_UPLOAD: '/media/upload',
  MEDIA_DOWNLOAD: '/media/download',
  
  // ML API endpoints
  PREDICT: '/ml/predict',
  PREDICTIONS: '/ml/predictions',
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
};
