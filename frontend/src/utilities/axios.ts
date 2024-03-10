/// <reference types="vite/client" />

import axios from "axios";
axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    if (!(config.data instanceof FormData) && !config.headers["Content-Type"]) {
      config.headers = config.headers || {};
      config.headers["Content-Type"] = "application/json";
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error Interceptor:", error);
    return Promise.reject(error);
  }
);

export default axios;
