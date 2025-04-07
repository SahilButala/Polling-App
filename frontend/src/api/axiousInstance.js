import axious from "axios";

import { BASE_URL } from "./apiPaths.js";

const axiosInstance = axious.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// request interceptor

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response interceptor

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.log("unauthorized user redirect to login..");

        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.log("server error please try again.. later");
      }
    } else if (error.code === "ENCONNABORTED") {
      console.log("Request TimeOut.");
    }
    return Promise.reject(error);
  }
);


export default axiosInstance