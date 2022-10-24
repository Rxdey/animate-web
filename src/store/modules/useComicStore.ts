import { defineStore } from 'pinia'
import { type detailRespose, detailFeatch } from '@/service/model/comic';
import { showToast } from "vant";

interface ComicDetail {
    [animaId: string]: detailRespose
}

interface ComicStore {
    comicDetailList: ComicDetail
}

export const useComicStore = defineStore('comic', {
    state: (): ComicStore => ({
        comicDetailList: {}
    }),
    actions: {
        async GET_COMIC_DETAIL(animaId: string) {
            if (this.comicDetailList[animaId]) return this.comicDetailList[animaId];
            const res = await detailFeatch({ animaId });
            const { state, data, msg } = res;
            if (state !== 1 || !data) {
                showToast(msg || '');
                return null;
            }
            this.comicDetailList[animaId] = data;
            return data;
        }
    }
})