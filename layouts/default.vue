<template>
  <div class="flex flex-col h-screen divide-y">
    <header class="flex w-full h-16 gap-4">
      <div class="w-20 m-auto text-center">IDLock</div>
      <div class="flex-grow"></div>
      <div class="m-auto text-center">
        {{ user.name }}
      </div>
      <div class="flex justify-center w-16 h-16">
        <img
          class="w-12 h-12 m-auto align-middle rounded-full"
          :src="user.avatar"
          alt="Avatar"
        />
      </div>
    </header>
    <div class="flex h-full divide-x">
      <aside class="flex flex-col w-5/12 max-w-sm divide-y">
        <div class="m-2">{{ loginsNumber }} logins</div>
        <ul class="flex flex-col h-full overflow-y-auto">
          <li
            v-for="(login, name) in logins"
            :key="login.username"
            class="border-l-4 border-purple-500"
          >
            <button
              class="w-full p-4 text-left"
              @click="$router.push(`/${name}`)"
            >
              <div>
                {{ name }}
              </div>
              <div>
                {{ login.username }}
              </div>
            </button>
          </li>
        </ul>
        <div class="h-24 p-5">
          <button
            class="w-full px-8 py-2 font-bold text-white bg-purple-500 rounded shadow hover:bg-purple-500 focus:shadow-outline focus:outline-none"
            @click="$router.push('/new')"
          >
            Create New Login
          </button>
        </div>
      </aside>
      <div class="w-full">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash"

export default {
  data() {
    return {
      user: {
        avatar: null,
        name: null,
      },
      logins: {},
      loginsNumber: 0,
    }
  },
  computed: {
    connected() {
      return this.$store.state.connected
    },
  },
  watch: {
    connected: {
      immediate: true,
      async handler(connected) {
        if (connected) {
          const [avatar, name, logins] = await Promise.all([
            this.$idlock.getAvatarUrl(),
            this.$idlock.getName(),
            this.$idlock.listLogins(),
          ])
          this.user = { avatar, name }
          this.logins = logins
          this.loginsNumber = _.size(logins)
        }
      },
    },
  },
  async mounted() {
    await this.$idlock.connect()
  },
}
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
