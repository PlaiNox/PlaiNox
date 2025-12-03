// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080", // backend root URL
});

// Her istekten önce çalışacak interceptor:
axiosInstance.interceptors.request.use(
    (config) => {
        // localStorage'dan token'i al
        const token = localStorage.getItem("token");

        // Token varsa Authorization header'a ekle
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // İstersen Content-Type da ekleyebilirsin:
        // config.headers["Content-Type"] = "application/json";

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
