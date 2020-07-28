export const state = () => ({
  connected: false,
})

export const mutations = {
  SET_CONNECTED(state) {
    state.connected = true
  },
  UNSET_CONNECTED(state) {
    state.connected = false
  },
}
