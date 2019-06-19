/*
export function someGetter (state) {
}
*/
export function isLoggedin (state) {
  return state => !!state.token
}

export function authStatus (state) {
  return state => state.status
}
