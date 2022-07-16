import axios, {AxiosRequestConfig} from "axios";

const getBaseUrl = () => {
  if (process.env.NODE_ENV !== 'production') return 'http://localhost:5757';
  return 'http://localhost:8086';
}

const config: AxiosRequestConfig = {
  baseURL: getBaseUrl()
}

export const API = axios.create(config);
