import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  Notify
// SessionStorage
} from 'quasar'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store, ssrContext }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (store.state.user.token === '' || store.state.user.token === 'undefined') {
        next({
          path: '/auth/login'
        })
      } else {
        if (Object.keys(store.state.user.user).length === 0) {
          store.dispatch('user/retrieveInfo')
            .then((response) => {
              if (response.data.success) {
                store.commit({
                  type: 'user/authSuccess',
                  user: response.data.data
                })
                next()
              } else {
                next({
                  path: '/auth/login'
                })
                store.dispatch('user/logout')
                Notify.create({
                  icon: 'ion-close',
                  color: 'negative',
                  message: 'Sesi anda telah habis, silahkan login kembali :)'
                })
              }
            })
            .catch(() => {
              Notify.create({
                icon: 'ion-close',
                color: 'yellow-9',
                message: 'Sepertinya internet anda tidak berjalan dengan baik :('
              })
            })
        } else {
          if (to.meta.role) {
            if (to.meta.role.includes(store.state.user.user.role)) {
              next()
            } else {
              next({ name: 'dashboard' })
              Notify.create({
                icon: 'ion-close',
                color: 'yellow-9',
                message: 'Anda tidak memiliki akses kesini.'
              })
            }
          } else {
            next()
          }
        }
      }
    } else if (to.matched.some(record => record.meta.guest)) {
      if (store.state.user.token === '' || store.state.user.token === 'undefined') {
        next()
      } else {
        next({ name: 'dashboard' })
      }
    } else {
      next()
    }
  })
  return Router
}
