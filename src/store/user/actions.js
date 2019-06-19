/*
export function someAction (context) {
}
*/
import { axiosInstance } from 'boot/axios'
import { Cookies } from 'quasar'

export function logout ({ commit }) {
  return new Promise((resolve, reject) => {
    commit('logout')
    Cookies.remove('token', { path: '/' })
    delete axiosInstance.defaults.headers.common['Authorization']
    resolve()
  })
}
export function retrieveInfo ({ commit }) {
  return new Promise((resolve, reject) => {
    axiosInstance.get('api/user/profile')
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
export function simpan ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.post('api/user', {
      nama: payload.form.nama,
      username: payload.form.username,
      email: payload.form.email,
      password: payload.form.password
    })
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
export function edit ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.put('api/user/' + payload.form.id, {
      nama: payload.form.nama,
      username: payload.form.username,
      email: payload.form.email,
      password: payload.form.password
    })
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
export function hapus ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.delete('api/user/' + payload.id)
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
export function show ({ commit }, payload) {
  return new Promise((resolve, reject) => {
    axiosInstance.get('api/user/' + payload.id)
      .then((response) => {
        resolve(response)
      })
      .catch((response) => {
        reject()
      })
  })
}
