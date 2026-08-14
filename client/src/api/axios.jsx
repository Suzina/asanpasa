import axios from 'axios';
  const baseUrl = import.meta.env.VITE_API_SERVER_URL;
  console.log(baseUrl);
export default axios.create({
    baseURL: baseUrl,
     withCredentials: true
});

export const axiosPrivate = axios.create({
  baseURL: baseUrl,
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