import Vuex from 'vuex'
import Vue from 'vue'
import modules from './modules'
Vue.use(Vuex)
const store = new Vuex.Store({
   state: {},
   actions: {},
   mutations: {},
   getters: {},
   modules,
})
export default store
