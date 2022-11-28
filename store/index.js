/* eslint-disable */

export const state = () => ({
  overlay: false,
})
export const mutations = {
  ENABLE_LOADING (state) {
    state.overlay = true
  },
  DISABLE_LOADING (state) {
    state.overlay = false
  },
}
export const actions = {
  enableLoading (context) {
    context.commit('ENABLE_LOADING')
  },
  disableLoading (context) {
    context.commit('DISABLE_LOADING')
  },
}
