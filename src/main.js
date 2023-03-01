import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
Vue.config.productionTip = false
//引入全局样式
import './assets/global.css'
import '@/styles/tailwind.css'
//引入antd样式
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

new Vue({
   router,
   store,
   render: h => h(App),
}).$mount('#app')
