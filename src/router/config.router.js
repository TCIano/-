export default [
   {
      name: '设备类型',
      path: 'typeOfEquipment',
      component: () => import('@/view/typeOfEquipment/index.vue'),
   },
   {
      name: '设备管理',
      path: 'equipmentManagement',
      component: () => import('@/view/equipmentManagement/index.vue'),
   },
]
