import axios from 'axios'
import { Cookies } from 'quasar'

const axiosInstance = axios.create({
  baseURL: 'http://localhost/EkspedisiWeb/BackEnd'
})

export default async ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
  const token = Cookies.get('token')
  if (token) {
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'bearer ' + token
  }
}
export { axiosInstance }
