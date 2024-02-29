// axios ecapsulation
import axios from "axios";
import { getToken, removeToken } from "./token";
import router from "@/router";
// 1. root url
// 2. timeout
const request = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
});
// 3. interceptors

request.interceptors.request.use(
  (config) => {
    // inject token
    // 1. get token
    // 2. set token
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.dir(error);
    if (error.response.status === 401) {
      removeToken();
      router.navigate("/login");
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export { request };
