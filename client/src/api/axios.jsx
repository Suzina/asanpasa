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
    console.log("sddddddddddd"+token);

    if (token) config.headers.accessToken = token;
  } catch (err) {
    console.error("Interceptor error:", err);
  }
  return config;
});