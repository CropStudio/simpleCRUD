import { Cookies } from 'quasar'
export default {
  //
  status: '',
  token: Cookies.get('token') || '',
  user: {},
  infos: []
}
