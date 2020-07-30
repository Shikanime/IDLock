import Box from "3box"

export default (ctx, inject) => {
  inject("idlock", {
    box: null,
    space: null,
    async login() {
      ctx.store.commit("SET_CONNECTING")

      const accounts = await window.ethereum.enable()
      const address = accounts[0]
      const provider = window.ethereum

      this.box = await Box.openBox(address, provider)
      this.space = await this.box.openSpace(process.env["3BOX_SPACE_NAME"])

      ctx.store.commit("SET_CONNECTED")
      ctx.store.commit("UNSET_CONNECTING")
    },
    async logout() {
      await this.box.logout()
      ctx.store.commit("UNSET_CONNECTED")
    },
    async fetchProfile() {
      const name = await this.box.public.get("name")
      const images = await this.box.public.get("image")
      const avatarImage = images[0]
      const avatarImageRootUrl = avatarImage.contentUrl["/"]
      const avatar = `${process.env.IPFS_URL}/${avatarImageRootUrl}`

      ctx.store.commit("SET_PROFILE", { name, avatar })
    },
    async fetchLogin(name) {
      const login = await this.space.private.get(name)
      ctx.store.commit("ADD_LOGIN", { name, ...JSON.parse(login) })
    },
    async fetchLogins() {
      Object.entries(await this.space.private.all()).forEach(([name, l]) => {
        ctx.store.commit("ADD_LOGIN", { name, ...JSON.parse(l) })
      })
    },
    async createLogin(login) {
      const payload = JSON.stringify({
        username: login.username,
        password: login.password,
      })

      if (await this.space.private.set(login.name, payload)) {
        ctx.store.commit("ADD_LOGIN", login)
      }
    },
    async removeLogin(name) {
      if (await this.space.private.remove(name)) {
        ctx.store.commit("REMOVE_LOGIN", name)
      }
    },
  })
}
