// lib/api.ts
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: baseURL + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Or use a cookie library
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    // Any status code within the range of 2xx triggers this
    return response;
  },
  (error) => {
    if (error.response?.status === 500) {
      console.error("Server side error occurred");
    }

    return Promise.reject(error);
  },
);

export default api;
