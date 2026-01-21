import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle auth errors and unwrap data
api.interceptors.response.use(
    (response) => {
        // If the backend wrapped the response in a { data: ... } object, unwrap it
        // NestJS TransformInterceptor does this.
        if (response.data && response.data.hasOwnProperty('data') && Object.keys(response.data).length <= 2) {
            return {
                ...response,
                data: response.data.data
            };
        }
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Redirect to login if needed, or let the UI handle it
            if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
                window.location.href = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
