// file: src/services/apiService.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export default apiClient;

// import.meta.env.VITE_API_URL