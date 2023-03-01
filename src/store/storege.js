export const storageStore = {
   // 本地存储
   set: function (name, value, day) {
      // 设置
      let d = new Date()
      let time = 0
      day = typeof day === 'undefined' || !day ? 1 : day // 时间,默认存储1天
      time = d.setHours(d.getHours() + 24 * day) // 毫秒
      localStorage.setItem(
         name,
         JSON.stringify({
            data: value,
            time: time,
         })
      )
   },
   get: function (name) {
      // 获取
      let data = localStorage.getItem(name)
      if (!data) {
         return null
      }
      let obj = JSON.parse(data)
      if (new Date().getTime() > obj.time) {
         // 过期
         localStorage.removeItem(name)
         return null
      } else {
         return obj.data
      }
   },
   clear: function (name) {
      // 清空
      if (name) {
         // 删除键为name的缓存
         localStorage.removeItem(name)
      } else {
         // 清空全部
         localStorage.clear()
      }
   },
}
