import request from '@/service/request';
import { ResponseType, CollectionData } from '@/service/responseTypes';

type SearchParams = {
    searchKey: string;
}
export type SearchRespose = {
    detailUrl: string;
    name?: string;
    cover?: string;
    author?: string;
    animaId: string | number;
}

/**
 * 搜索
 * @param params 
 * @returns
 */
export const searchFeatch = (params: SearchParams): Promise<ResponseType<SearchRespose[]>> => request({
    url: '/search',
    method: 'get'
}, params);


type CollectionParams = {
    userId: string;
    source?: string;
    animateId: string | number;
    animateName: string;
    cover: string;
    state?: string | string;
}
type CollectionRespose = {
    state: number | string
}

/**
 * 添加/删除收藏
 * @param params state 0 未收藏 1 已收藏
 * @returns 
 */
export const collectionFeatch = (params: CollectionParams): Promise<ResponseType<CollectionRespose>> => request({
    url: '/collection',
    method: 'post'
}, params);

type getCollectionParams = {
    userId: string;
    source?: string;
    animateId: string;
}
/**
 * 是否收藏
 * @param params 
 * @returns 
 */
export const getCollectionFeatch = (params: getCollectionParams): Promise<ResponseType<CollectionData>> => request({
    url: '/getCollection',
    method: 'get'
}, params);


type detailParams = {
    animaId: string | number;
}
type detailRespose = {
    chapter: string;
    chapterUrl: string;
    chapterId: string | number;
    animaId: string | number;
}
/**
 * comic详情页面
 * @param params 
 * @returns 
 */
export const detailFeatch = (params: detailParams): Promise<ResponseType<detailRespose>> => request({
    url: '/detail',
    method: 'get'
}, params);


type getChapterParams = {
    animaId: string | number;
    chapterId: string | number;
}
type getChapterRespose = {
    imgUrl: string;
    animaId: string | number;
    chapterId: string | number;
    index: string | number;
    total: string | number;
}
/**
 * 获取当前话内容
 * @param { getChapterParams } params
 * @returns 章节详情
 */
export const getChapterFeatch = (params: getChapterParams): Promise<ResponseType<getChapterRespose[]>> => request({
    url: '/getChapter',
    method: 'get'
}, params);


type getAnimateListParams = {
    userId: string | number;
    source: string | number;
    pageSize?: number;
    pageNo?: number;
    state: number;
}
/**
 * 获取所有收藏/历史
 * state为0时查询所有
 * @param params 
 * @returns 
 */
export const getAnimateListFeatch = (params: getAnimateListParams): Promise<ResponseType<CollectionData[]>> => request({
    url: '/getAnimateList',
    method: 'get'
}, params);
