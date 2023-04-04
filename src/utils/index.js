import cloneDeep from 'lodash.clonedeep'
/**
 *
 * @param {Object} data 被拷贝对象
 * @returns
 */
export const deepClone = data => {
   return cloneDeep(data)
}
/**
 * 二维数组转为链表
 * @param {二维数组} arr
 * isSelectAll 每个节点是否可选
 * cascader 是否为级联数据
 * @returns
 */
function arr2List(arr, isSelectAll, cascader) {
   const list = []
   let head = {}
   let key = arr[0]
   //解决当只能选中子节点且当前元素只有一层时，不能被选中的问题
   head =
      arr.length > 1
         ? {
            title: arr[0],
            key: arr[0],
            children: [],
            selectable: isSelectAll ? true : false,
         }
         : {
            title: arr[0],
            key: arr[0],
            children: [],
            selectable: true,
         }
   let prev = head
   list.push(prev)
   for (let i = 1; i < arr.length; i++) {
      !cascader ? (key += ',' + arr[i]) : (key = arr[i])

      let current
      if (isSelectAll) {
         current = {
            title: arr[i],
            key: key,
            scopedSlots: { title: 'title' },
            selectable: true,
            children: [],
         }
      } else {
         current = {
            title: arr[i],
            key: key,
            scopedSlots: { title: 'title' },
            selectable: i === arr.length - 1 ? true : false,
            children: [],
         }
      }
      prev.children.push(current)
      prev = current
   }
   return list
}

function mergeList(tree, list) {
   if (!tree) {
      return
   }
   const hasCommonParent = tree.some(treeItem => {
      // 有共同的父节点
      if (treeItem.title === list[0].title) {
         mergeList(treeItem.children, list[0].children)
         return true
      }
      return false
   })

   if (!tree.length || !hasCommonParent) {
      tree.push(list[0])
   }
}
/**
 * 二位数组转树
 * @param {二维数组} arr
 * @returns
 */
export const arr2Tree = (arr, isSelectAll = true, cascader = false) => {
   const tree = []
   arr.forEach(item => {
      const list = arr2List(item, isSelectAll, cascader)
      mergeList(tree, list)
   })
   return tree
}
/**
 * 判断连个对象是否相等
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns
 */
export const isObjectEqual = (obj1, obj2) => {
   let o1 = obj1 instanceof Object
   let o2 = obj2 instanceof Object
   if (!o1 || !o2) {
      // 如果不是对象 直接判断数据是否相等
      return obj1 === obj2
   }
   // 判断对象的可枚举属性组成的数组长度
   if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false
   }
   for (let attr in obj1) {
      let a1 = Object.prototype.toString.call(obj1[attr]) == '[object Object]'
      let a2 = Object.prototype.toString.call(obj2[attr]) == '[object Object]'
      let arr1 = Object.prototype.toString.call(obj1[attr]) == '[object Array]'
      if (a1 && a2) {
         // 如果是对象继续判断
         return isObjectEqual(obj1[attr], obj2[attr])
      } else if (arr1) {
         // 如果是对象 判断
         if (obj1[attr].toString() != obj2[attr].toString()) {
            return false
         }
      } else if (obj1[attr] !== obj2[attr]) {
         // 不是对象的就判断数值是否相等
         return false
      }
   }
   return true
}
/**
 * 获取url参数
 * @param {String} name url
 * @returns 
 */
export const getUrlParam = function (name) { // 获取url参数
   let reg = new RegExp('(^|&?)' + name + '=([^&]*)(&|$)', 'i')
   let r = window.location.href.substr(1).match(reg)
   if (r != null) {
      return decodeURI(r[2])
   }
   return undefined
}
/**
 * 函数防抖
 * @param {Function} func  函数
 * @param {Number} wait 延迟执行毫秒数
 * @param {Boolean} immediate true 表立即执行,false 表非立即执行,立即执行是触发事件后函数会立即执行，然后n秒内不触发事件才能继续执行函数的效果
 * @returns 
 */
export const debounce = function (func, wait, immediate) {
   let timeout;
   return function () {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
         var callNow = !timeout;
         timeout = setTimeout(() => {
            timeout = null;
         }, wait)
         if (callNow) func.apply(context, args)
      } else {
         timeout = setTimeout(function () {
            func.apply(context, args)
         }, wait);
      }
   }
}
/**
 * 函数节流
 * @param {Function} func 函数
 * @param {Number} wait 延迟执行毫秒数
 * @param {String} type 1 表时间戳版，2 表定时器版
 * @returns 
 */
export const throttle = function (func, wait, type) {
   if (type === 1) {
      var previous = 0;
   } else if (type === 2) {
      var timeout;
   }
   return function () {
      let context = this;
      let args = arguments;
      if (type === 1) {
         let now = Date.now();
         if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
         }
      } else if (type === 2) {
         if (!timeout) {
            timeout = setTimeout(() => {
               timeout = null;
               func.apply(context, args)
            }, wait)
         }
      }
   }
}
/**
 * 图片转为base64
 * @param {String} img 图片路径
 * @returns 
 */
export const getBase64 = function (img, Imgwidth, Imgheight) {
   let getBase64Image = function (img, width, height) {
      let canvas = document.createElement("canvas");
      //width、height调用时传入具体像素值，控制大小,不传则默认图像大小
      canvas.width = width ? width : img.width;
      canvas.height = height ? height : img.height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      let dataURL = canvas.toDataURL();
      return dataURL;
   }
   let image = new Image();
   image.crossOrigin = '';
   image.src = img;
   if (img) {
      image.onload = function () {
         new Promise((resolve) => {
            let url = getBase64Image(image, Imgwidth, Imgheight)
            resolve(url)
         })
      }
   }
}
/**
 * 判断图片加载完成
 * @param {*} arr 
 * @param {*} callback 
 */
export const imgLoadAll = function (arr, callback) { // 图片加载
   let arrImg = []
   for (let i = 0; i < arr.length; i++) {
      let img = new Image()
      img.src = arr[i]
      img.onload = function () {
         arrImg.push(this)
         if (arrImg.length == arr.length) {
            callback && callback()
         }
      }
   }
}
