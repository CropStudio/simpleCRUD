/*
export function someMutation (state) {
}
*/
export const authSuccess = (state, payload) => {
  state.status = 'success'
  state.token = payload.token
  state.user = payload.user
}
export const authError = (state) => {
  state.status = 'error'
}
export const logout = (state) => {
  state.status = ''
  state.token = ''
}
