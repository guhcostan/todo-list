import axios from 'axios';

axios.interceptors.request.use(function (config) {
    const token = 'token'
    config.headers.set({
        Authorization: `Bearer ${token}`
    })
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axios;
