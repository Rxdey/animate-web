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
            title: '收藏'
        }
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search/search.vue'),
        meta: {
            title: '找找'
        }
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/views/user/user.vue'),
        meta: {
            title: 'ME'
        }
    },

    {
        path: '/detail',
        name: 'detail',
        component: () => import('@/views/detail/detail.vue'),
        meta: {
            title: '详情'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue'),
        meta: {
            title: '登录'
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes,
});

export default router
