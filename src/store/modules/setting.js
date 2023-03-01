import deepClone from 'lodash.clonedeep'
import { filterMenu } from '@/utils/authority-utils'

export default {
   namespaced: true,
   state: {
      menuData: [],
   },
   getters: {
      menuData(state, getters, rootState) {
         //  console.log(rootState)
         let permissions = []
         let roles = []
         return filterMenu(deepClone(state.menuData), permissions, roles)
      },
   },
   mutations: {
      setMenuData(state, menuData) {
         //侧边菜单路由
         state.menuData = menuData
      },
   },
   actions: {},
}
