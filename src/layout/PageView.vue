<template>
   <a-layout
      id="components-layout-demo-custom-trigger"
      :class="['admin-layout']"
      style="min-height: 100%"
   >
      <SideMenu :menuData="sideMenuData"></SideMenu>
      <a-layout>
         <a-layout-content
            :style="{
               margin: '24px 16px',
               padding: '24px',
               background: '#fff',
               minHeight: '280px',
            }"
         >
            <router-view></router-view>
         </a-layout-content>
      </a-layout>
   </a-layout>
</template>

<script>
import SideMenu from '@/components/menu/SideMenu.vue'

export default {
   components: { SideMenu },
   data() {
      return {}
   },
   watch: {
      menuData() {},
   },
   computed: {
      sideMenuData() {
         console.log(this.$store.getters['setting/menuData'])
         return this.$store.getters['setting/menuData']
      },
   },
   created() {
      console.log(this.$store)
   },
}
</script>

<style scoped lang="less">
.admin-layout {
   .side-menu {
      &.fixed-side {
         position: fixed;
         height: 100vh;
         left: 0;
         top: 0;
      }
   }
}
#components-layout-demo-custom-trigger .trigger {
   font-size: 18px;
   line-height: 64px;
   padding: 0 24px;
   cursor: pointer;
   transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
   color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
   height: 32px;
   background: rgba(255, 255, 255, 0.2);
   margin: 16px;
}
</style>
