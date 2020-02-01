import Vue from 'vue'
import router from './router/index';
import {routes} from './router/index';
import ErrorPage from './views/error/404'
import cookies from 'vue-cookies'
import './plugins/element.js';

Vue.config.productionTip = false

//路由权限
router.beforeEach((to, from, next) => {
  let isLogin = cookies.get('info');
  if (!isLogin) {
    //未登录
    if (to.path !== '/login') {
      //跳转到登录页
      return next({ path: '/login' });
    } else {
      next();
    }
  }
});



new Vue({
  data: {
    currentRoute: window.location.pathname
  },
  // router,
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || ErrorPage
    }
  },
  render (h) { return h(this.ViewComponent) }
  // render: h => h(App),
}).$mount('#app')
