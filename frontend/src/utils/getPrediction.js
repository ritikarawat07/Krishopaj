import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/apiConfig';

export const getPrediction = async (sensorData = {}) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.PREDICT}`,
      sensorData
    );
    return response.data;
  } catch (error) {
    console.error('Error getting prediction:', error);
    
    // Return mock data for development
    return [
      {
        name: 'Rice',
        recommended: true,
        confidence: 85,
      },
      {
        name: 'Wheat',
        recommended: true,
        confidence: 72,
      },
      {
        name: 'Cotton',
        recommended: false,
        confidence: 45,
      },
    ];
  }
};

export default getPrediction;
