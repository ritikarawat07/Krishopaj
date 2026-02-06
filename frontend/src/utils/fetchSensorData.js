import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/apiConfig';

export const fetchSensorData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}${API_ENDPOINTS.SENSOR_DATA}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    
    // Return mock data for development
    return {
      temperature: 28.5,
      humidity: 65,
      soilMoisture: 45,
      timestamp: new Date().toISOString(),
    };
  }
};

export default fetchSensorData;
