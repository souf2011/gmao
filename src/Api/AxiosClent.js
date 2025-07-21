import axios from 'axios';

const axiosClent = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',

});

axiosClent.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default axiosClent;