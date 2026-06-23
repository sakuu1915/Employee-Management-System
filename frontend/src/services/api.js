import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-management-system-cg1b.onrender.com/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    console.log("Token:", localStorage.getItem("token"));
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;