import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login';
import Home from '../views/Home'
import ErrorPage from '../views/error/404'
Vue.use(Router);

// 注意，配置路由的名字，需要name属性与url的最后路径相同,与刷新保留打开菜单和面包屑有关
//  如下{
//   name: "data-statistics",
//   path: "/data-access/data-statistics",
//   component: DataStatistics,
//   meta: {
//     title: "数据统计",
//     keepAlive: true,
//   },
// }

export const routes = {
  '/': Home,
  '/login': Login,
  '/home': Home,
}

// let isProduction = process.env.NODE_ENV === 'production';
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '*',
      name: '*404',
      component: ErrorPage,
    },
  ],
});
