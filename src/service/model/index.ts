import request from '@/service/request';
import { ResponseType, CollectionData } from '@/service/responseTypes';

type loadImgParams = {
    url: string
}

export const loadImg = (params: loadImgParams): Promise<ResponseType<any>> => request({
    url: '/loadImg',
    method: 'get'
}, params);