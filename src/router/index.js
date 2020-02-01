import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/',
      component: ()=> import('../views/Home.vue'),
      children: [
        {
          path: '/home',
          component: ()=> import('../views/Home.vue')
        }
      ]
    },
    {
      path: '/login',
      component: ()=> import('../views/Login.vue'),
      meta: {title:"登录"}
    },
    {
      path: '/404',
      component: ()=> import('../views/error/404.vue'),
      meta: {title:"404"}
    }
    ,
    {
      path: '*',
      redirect: '/404'
    },
  ],
});
