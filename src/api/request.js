import axios from 'axios'
import store from '@/store/index'
import router from "@/router";

import {
  Toast
} from "vant"


const instance = axios.create({
  baseURL: 'http://api.w0824.com/',
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  config.headers['If-Modified-Since'] = 0;

  if(store.state.token){
    config.headers['token'] = store.state.token
  }
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
  if(response.data.status === 40001){
    store.commit('removeUserOrToken')
    router.push('/login')
    return;
  }

  return response.data;
}, function (error) {
  Toast.clear();
  return Promise.reject(error);
});

export default instance


