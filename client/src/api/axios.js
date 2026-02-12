import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.MODE === 'production' ? '' : 'http://localhost:8080',
    withCredentials: true
});

export default api;