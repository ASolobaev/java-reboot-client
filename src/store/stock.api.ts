import axios, {AxiosRequestConfig} from "axios";

const getBaseUrl = () => {
  if (process.env.NODE_ENV !== 'production') return 'http://localhost:5757';
  return 'http://localhost:8085';
}

const config: AxiosRequestConfig = {
  baseURL: getBaseUrl()
}

export const StockAPI = axios.create(config);

StockAPI.interceptors.response.use((response) => {}, (error) => {
  if (error.response?.status === 400) window.location.href = '/400';
  else if (error.response?.status === 404) window.location.href = '/404';
  return Promise.reject(error);
})
