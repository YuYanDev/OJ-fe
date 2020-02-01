import Vue from 'vue'
import App from './App.vue'
import router from './router';
// import cookies from 'vue-cookies'
import './plugins/element.js';

Vue.config.productionTip = false

// //路由权限
// router.beforeEach((to, from, next) => {
//   let isLogin = cookies.get('info');
//   if (!isLogin) {
//     //未登录
//     if (to.path !== '/login') {
//       //跳转到登录页
//       return next({ path: '/login' });
//     } else {
//       next();
//     }
//   }
// });

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
