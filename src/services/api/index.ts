import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
    // temp url
    baseURL: 'https://192.168.1.103:12345',
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use(config => {
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    // }
    console.log('Sending request to API:', config.url);
    return config;
}, error => {

    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;