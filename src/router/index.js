import Vue from 'vue';
import Router from 'vue-router';
import storage from '@/utils/storage'
import {STORAGE_KEY} from '@/utils/constants'

Vue.use(Router);
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/',
            component: () => import('../views/Home.vue'),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('../views/Home.vue')
                }
            ]
        },
        {
            path: '/login',
            component: () => import('../views/Login.vue'),
            meta: {title: "登录"}
        },
        {
            path: '/404',
            component: () => import('../views/error/404.vue'),
            meta: {title: "404"}
        },
        {
            path: '/500',
            component: () => import('../views/Home'),
            meta: {requiresAuth: true}
        }
        ,
        {
            path: '*',
            redirect: '/404'
        },
    ],
});


// 全局身份确认
router.beforeEach((to, from, next) => {
    let profile = storage.get(STORAGE_KEY.AUTHED);
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!profile) {
            Vue.prototype.$message('Please login first')
            next({
                name: 'home'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router