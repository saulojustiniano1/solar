import axios from 'axios';
import configBase from './config';

const api = axios.create({
  baseURL: configBase.API_URL,
  timeout: configBase.TIMEOUT,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.replace('/');
    }
    return Promise.reject(error);
  }
);

export default api;
