import axios from 'axios'

import {
  Toast
} from "vant"


const instance = axios.create({
  baseURL: 'http://api.w0824.com/',
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {

  // 开启loading
  Toast.loading({
    message: 'loading...',
    forbidClick: true,
  });

  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  Toast.clear();

  return response.data;
}, function (error) {
  Toast.clear();
  return Promise.reject(error);
});

export default instance


