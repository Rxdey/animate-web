import request from '@/service/request';
import { ResponseType } from '@/service/responseTypes';

type LoginParams = {
    userName: string;
    password: string;
}
export type UserType = {
    birthDay?: string;
    createDate?: string;
    email?: string;
    headImg?: string;
    id: number;
    nickName?: string;
    phone?: string;
    sex?: number;
    userName: string;
    token?: string;
}
/**
 * 登录
 * @param params LoginParams
 * @returns 
 */
export const login = async (params: LoginParams) => {
    const res: ResponseType<UserType> = await request({
        url: '/login',
        method: 'post'
    }, params);
    return res;
}

export const getUserInfo = (): Promise<ResponseType<UserType>> => request({
    url: '/getUserInfo',
    method: 'get'
}, {});