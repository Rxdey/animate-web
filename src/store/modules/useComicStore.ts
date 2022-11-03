import { defineStore } from 'pinia'
import { type detailRespose, type getChapterRespose, detailFeatch, getChapterFeatch } from '@/service/model/comic';
import { showToast } from "vant";

interface ComicDetail {
    [animateId: string]: detailRespose,
}
interface comicChapterImg {
    [animateId: string]: {
        [chapterId: string]: getChapterRespose[]
    },
}

interface ComicStore {
    comicDetailList: ComicDetail,
    comicChapterImgList: comicChapterImg
}

export const useComicStore = defineStore('comic', {
    state: (): ComicStore => ({
        comicDetailList: {},
        comicChapterImgList: {}
    }),
    actions: {
        // 详情页面
        async GET_COMIC_DETAIL(animateId: string) {
            if (this.comicDetailList[animateId]) return this.comicDetailList[animateId];
            const res = await detailFeatch({ animateId });
            const { state, data, msg } = res;
            if (state !== 1 || !data) {
                showToast(msg || '');
                return null;
            }
            this.comicDetailList[animateId] = data;
            return data;
        },
        // 获取图片
        async GET_COMIC_CHAPTER_IMG(animateId: string | number, chapterId: string | number) {
            if (this.comicChapterImgList[animateId] && this.comicChapterImgList[animateId][chapterId]) return this.comicChapterImgList[animateId][chapterId];
            const res = await getChapterFeatch({ animateId, chapterId });
            const { state, msg, data } = res;
            if (state !== 1 || !data) {
                showToast(msg || '');
                return [];
            }
            if (!this.comicChapterImgList[animateId]) this.comicChapterImgList[animateId] = {};
            this.comicChapterImgList[animateId][chapterId] = data;
            return data;
        }
    },
    getters: {
        hasChapterData(state) {
            return (animateId: string | number, chapterId?: string | number) => {
                return !!(animateId && chapterId && state.comicChapterImgList[animateId] && state.comicChapterImgList[animateId][chapterId])
            }
        }
    }
})