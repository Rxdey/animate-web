import { defineStore } from 'pinia'

// 元素要与组件的name一致而不是路由的name
export const KEEP_PAGE_LIST = ['home', 'search', 'user'];

export const useMainStore = defineStore('main', {
    state: () => ({
        loading: false,
        keepPageList: KEEP_PAGE_LIST
    }),
    getters: {
        keepPageString: state => state.keepPageList.join()
    }
})