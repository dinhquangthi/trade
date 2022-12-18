/* eslint-disable */

export const state = () => ({
  overlay: false,
  refresh: false,
});
export const mutations = {
  ENABLE_LOADING(state) {
    state.overlay = true;
  },
  DISABLE_LOADING(state) {
    state.overlay = false;
  },
  ENABLE_REFRESH(state) {
    state.refresh = true;
  },
  DISABLE_REFRESH(state) {
    state.refresh = false;
  },
};
export const actions = {
  enableLoading(context) {
    context.commit("ENABLE_LOADING");
  },
  disableLoading(context) {
    context.commit("DISABLE_LOADING");
  },
  enableRefresh(context) {
    context.commit("ENABLE_REFRESH");
  },
  disableRefresh(context) {
    context.commit("DISABLE_REFRESH");
  },
};
