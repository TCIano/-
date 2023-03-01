/**
 * 从路由 path 解析 i18n key
 * @param path
 * @returns {*}
 */
export function getI18nKey(path) {
   const keys = path.split('/').filter(item => !item.startsWith(':') && item != '')
   keys.push('name')
   return keys.join('.')
}
