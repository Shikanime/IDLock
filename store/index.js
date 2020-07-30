export const state = () => ({
  isConnecting: false,
  isLogged: false,
  logins: [],
  profile: null,
})

export const mutations = {
  SET_CONNECTING(s) {
    s.isConnecting = true
  },
  UNSET_CONNECTING(s) {
    s.isConnecting = false
  },
  SET_CONNECTED(s) {
    s.isLogged = true
  },
  UNSET_CONNECTED(s) {
    s.isLogged = false
  },
  ADD_LOGIN(s, login) {
    if (!s.logins.find((l) => l.name === login.name)) {
      s.logins = [login, ...s.logins]
    }
  },
  REMOVE_LOGIN(s, name) {
    s.logins = s.logins.filter((l) => l.name !== name)
  },
  SET_PROFILE(s, profile) {
    s.profile = profile
  },
  UNSET_PROFILE(s) {
    s.profile = null
  },
  RESET(s) {
    Object.assign(s, state())
  },
}
