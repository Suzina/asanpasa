import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3001/',
     withCredentials: true
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:3001/",
  headers: { 'Content-Type': 'application/json' },
});

axiosPrivate.interceptors.request.use((config) => {
  try {
    const token = sessionStorage.getItem("accessToken");

    if (token) config.headers.accessToken = token;
  } catch (err) {
    console.error("Interceptor error:", err);
  }
  return config;
});

axiosPrivate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      sessionStorage.removeItem("accessToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);