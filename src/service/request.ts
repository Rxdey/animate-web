import defaultInstance, { AxiosCustomConfig, jsonp } from './interceptors';

const BASE_CONFIG: AxiosCustomConfig = {
  method: 'get',
  url: '/',
  timeout: 10000,
  responseType: 'json',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
};
/**
 * 请求封装
 * @param {Object} opt 请求配置
 * @param {Object} data 参数
 * @param {Blooean} isQs 是否qs格式化参数
 */
const request = async (config: AxiosCustomConfig, data = {}) => {
  const setting = { ...BASE_CONFIG, ...config };
  const { type, url, method } = config;
  if (!url) return null;
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
    const res = await instance(setting);
    return res.data;
  } catch (error: any) {
    // 此处把异常处理掉
    console.error(error);
    return { code: 0 };
  }
};

export default request;
