import Box from "3box"
import _ from "lodash"

export default (ctx, inject) => {
  inject("idlock", {
    box: null,
    space: null,
    async connect() {
      const accounts = await window.ethereum.enable()
      this.box = await Box.openBox(accounts[0], window.ethereum)
      this.space = await this.box.openSpace("IDLock")
      ctx.store.commit("SET_CONNECTED")
    },
    async getAvatarUrl() {
      const images = await this.box.public.get("image")
      const avatarImage = images[0]
      const avatarImageRootUrl = avatarImage.contentUrl["/"]
      return `https://ipfs.infura.io/ipfs/${avatarImageRootUrl}`
    },
    getName() {
      return this.box.public.get("name")
    },
    async getLogin(name) {
      const login = await this.space.private.get(name)
      return JSON.parse(login)
    },
    async listLogins() {
      const logins = await this.space.private.all()
      return _.mapValues(logins, (login) => JSON.parse(login))
    },
    async createLogin({ name, username, password }) {
      const payload = JSON.stringify({ username, password })
      const isSuccess = await this.space.private.set(name, payload)
      if (isSuccess) {
        return { name, username, password }
      } else {
        return new Error("couldn't create new login")
      }
    },
  })
}
