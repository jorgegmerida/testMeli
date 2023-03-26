import axios from "axios";

export const axiosRequestInterceptor = () => {
  axios.interceptors.request.use((request: any) => {
    return request;
  });
};

export const axiosResponseInterceptor = () => {
  axios.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
};
