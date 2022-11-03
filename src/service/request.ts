import defaultInstance, { AxiosCustomConfig, jsonp } from './interceptors';
import { ResponseType } from '@/service/responseTypes';
import { BASE_URL } from "./api.config";

const BASE_CONFIG: AxiosCustomConfig = {
  method: 'get',
  url: '/',
  timeout: 100000,
  baseURL: BASE_URL,
  responseType: 'json',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
};

type RequestType<T> = {
  config: AxiosCustomConfig;
  data?: T
}
/**
 * 请求封装
 * @param {Object} config 请求配置
 * @param {Object} data 参数
 */
const request = async <T, P>(config: AxiosCustomConfig, data: T): Promise<ResponseType<P>> => {
  const setting = { ...BASE_CONFIG, ...config };
  const headers = { ...BASE_CONFIG.headers, ...config.headers }
  setting.headers = headers;
  const { type, url, method } = config;
  if (!url) return { state: 0 };
  if (method && method.toUpperCase() === 'GET') {
    setting.params = data;
  } else {
    setting.data = data;
  }
  const instance = defaultInstance(setting);
  try {
    if (type === 'jsonp') {
      const res = await jsonp(url, data);
      return res;
    }
    const res: ResponseType<P> = await instance(setting);
    return res.data || { state: 0 };
  } catch (error: any) {
    // 此处把异常处理掉
    console.error(error);
    return { state: 0 };
  }
};

export default request;
