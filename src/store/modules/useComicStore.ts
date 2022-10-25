import { defineStore } from 'pinia'
import { type detailRespose, detailFeatch } from '@/service/model/comic';
import { showToast } from "vant";

interface ComicDetail {
    [animateId: string]: detailRespose
}

interface ComicStore {
    comicDetailList: ComicDetail
}

export const useComicStore = defineStore('comic', {
    state: (): ComicStore => ({
        comicDetailList: {}
    }),
    actions: {
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
        }
    }
})