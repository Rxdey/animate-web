import request from '@/service/request';
// import { AxiosCustomConfig } from '@/service/interceptors';

interface BaiduGetResponse {
  p?: boolean;
  q?: string;
  s?: Array<string>;
}
interface BaiduGetRequest {
  request: (params?: {
    wd?: string;
    p?: number;
    t?: number;
    cb?: string;
  },
    options?: {
      loading?: boolean
    }) => Promise<BaiduGetResponse>
}
export const baidu: BaiduGetRequest = {
  request: (params) => request({
    url: '//suggestion.baidu.com/su',
    method: 'get',
    type: 'jsonp',
  }, params),
};

export default baidu;
