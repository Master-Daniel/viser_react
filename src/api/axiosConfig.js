import axios from 'axios';
import axiosRateLimit from 'axios-rate-limit';

const axiosInstance = axiosRateLimit(axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
}), { maxRPS: 5 });

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.clear()
            const currentPath = encodeURIComponent(window.location.pathname + window.location.search);
            window.location.href = `/auth/login?redirect=${currentPath}`;
        }
        const res = error.response?.data ?? { message: 'Something went wrong' }
        return Promise.reject(res);
    }
);

export default axiosInstance;