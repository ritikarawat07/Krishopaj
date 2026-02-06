import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config/apiConfig';

export const uploadMedia = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });

    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.MEDIA_UPLOAD}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error uploading media:', error);
    throw error;
  }
};

export default uploadMedia;
