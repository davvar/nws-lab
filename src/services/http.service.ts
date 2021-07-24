import axios, { AxiosRequestConfig } from 'axios';

export const http = {
  get: (url: string, options: AxiosRequestConfig = {}) => {
    return axios.get(url, options).then(({ data }) => data);
  },
};
