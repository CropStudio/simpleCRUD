import Vue from 'vue'
import Vuex from 'vuex'

// import example from './module-example'
import user from './user'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
      user
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
  if (process.env.DEV && module.hot) {
    module.hot.accept([
      './user'
    ], () => {
      const newUserr = require('./user').default
      Store.hotUpdate({ modules: {
        user: newUserr
      } })
    })
  }
  return Store
}
