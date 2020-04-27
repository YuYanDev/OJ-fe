import Vue from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';
import {Message} from 'element-ui'
import './plugins/element.js';

Vue.config.productionTip = false

Vue.prototype.$message = Message
new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
