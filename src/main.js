import Vue from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';
import {Message, Loading} from 'element-ui'
import './plugins/element.js';

Vue.config.productionTip = false

Vue.prototype.$message = Message
Vue.prototype.$Loading = Loading
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
