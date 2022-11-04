import axios, { AxiosRequestConfig, AxiosInstance, RawAxiosRequestHeaders } from 'axios';
import qs from 'qs';
import Cookies from 'js-cookie';
import { showToast } from 'vant';

axios.defaults.withCredentials = true;

export type ActionType = {
  [key: string]: string
}

export interface AxiosCustomConfig extends AxiosRequestConfig {
  type?: string
}
/**
 * jsonp请求
 * @param url
 * @param obj
 * @returns 返回值不太好确定
 */
export const jsonp = <T>(url: string, obj: T): Promise<any> => {
  const data = qs.stringify(obj);
  return new Promise((resolve, reject) => {
    window.jsonCallBack = (result: any) => {
      resolve(result);
    };
    const JSONP = document.createElement('script');
    JSONP.type = 'text/javascript';
    JSONP.src = `${url}?${data}&cb=jsonCallBack`;
    document.getElementsByTagName('head')[0].appendChild(JSONP);
    JSONP.onerror = (e) => {
      reject(e);
    };
    setTimeout(() => {
      document.getElementsByTagName('head')[0].removeChild(JSONP);
    }, 500);
  });
};

const defaultInstance = (config: AxiosCustomConfig) => {
  const instance: AxiosInstance = axios.create(config);
  instance.interceptors.request.use((res) => ({
    ...res,
    headers: <RawAxiosRequestHeaders & { token?: string }>{
      ...res.headers,
      token: Cookies.get('token')
    },
  }));
  instance.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    const status: number = error.request ? error.request.status : 0;
    const action: ActionType = {
      405: '登录信息获取失败', // 这里没token返回的是405
      404: '找不到请求地址',
      500: '系统异常',
      504: '请求超时，请检查网络环境并重试',
      401: '登录认证过期或失败，请重新登录'
    };
    console.log({ message: `ERROR: ${status} - ${action[status] || '系统异常'} >_<` });
    console.error(`接口:${error.config.url}  异常 --- ${error.message}`);
    showToast(action[status] || '系统异常');
    if (status === 401) {
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000)
    }
    return error;
  });
  return instance;
};

export default defaultInstance;
