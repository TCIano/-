import Vue from 'vue'
import Router from 'vue-router'
import PageView from '@/layout/PageView.vue'
import store from '@/store'
import childRouter from './config.router'
store.commit('setting/setMenuData', childRouter)
Vue.use(Router)

//配置路由
const routes = [
   {
      path: '/',
      component: PageView,
      redirect: '/equipmentManagement',
      children: childRouter,
   },
]

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

const router = new Router({
   // mode: 'history',
   routes,
})
export default router
