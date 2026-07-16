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
  const token = sessionStorage.getItem("accessToken");
  if (token) {
    config.headers.accessToken = token;
  }
  return config;
});