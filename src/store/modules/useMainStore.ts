import { defineStore } from 'pinia'

const useMainStore = defineStore('main', {
    state: () => ({
        loading: false
    })
})