import request from '@/service/request';
import { ResponseType } from '@/service/responseTypes';

type LoginParams = {
    userName: string;
    passWord: string;
}

export const login = async (params: LoginParams) => {
    const res: ResponseType<any> = await request({
        url: '/login',
        method: 'post'
    }, params);
    return res;
}
