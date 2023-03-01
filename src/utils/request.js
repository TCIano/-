import { message } from 'ant-design-vue'
import axios from 'axios'

const request = axios.create({
   baseURL: '',
   timeout: 20000,
})

//请求拦截器
request.interceptors.request.use()
//响应拦截器
request.interceptors.response.use(
   response => {
      return response
   },
   error => {
      return message.error(error)
   }
)

export default request
