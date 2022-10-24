import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/home.vue'),
        meta: {
            title: 'Home'
        }
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search/search.vue'),
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/user.vue'),
    },

    {
        path: '/detail',
        name: 'detail',
        component: () => import('@/views/detail/detail.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes,
});

export default router
