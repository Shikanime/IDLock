<template>
  <div class="flex flex-col h-screen divide-y">
    <header class="flex w-full h-16 gap-4">
      <div class="w-20 m-auto text-center">IDLock</div>
      <div class="flex-grow"></div>
      <template v-if="profile">
        <div class="m-auto text-center">
          {{ profile.name }}
        </div>
        <div class="flex justify-center w-16 h-16">
          <img
            class="w-12 h-12 m-auto align-middle rounded-full"
            :src="profile.avatar"
            alt="Avatar"
          />
        </div>
      </template>
    </header>
    <div class="flex h-full divide-x">
      <aside class="flex flex-col w-5/12 max-w-sm divide-y">
        <div class="m-2">
          <template v-if="logins.length !== 0">
            {{ logins.length }} logins
          </template>
          <template v-else> No logins </template>
        </div>
        <ul class="flex flex-col h-full overflow-y-auto">
          <li
            v-for="login in logins"
            :key="login.username"
            class="border-l-4 border-purple-500"
          >
            <button
              class="w-full p-4 text-left"
              @click="$router.push(`/${login.name}`)"
            >
              <div>
                {{ login.name }}
              </div>
              <div>
                {{ login.username }}
              </div>
            </button>
          </li>
        </ul>
        <div class="h-24 p-5">
          <button class="w-full idl-button" @click="$router.push('/new')">
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
export default {
  computed: {
    isConnecting() {
      return this.$store.state.isConnecting
    },
    isLogged() {
      return this.$store.state.isLogged
    },
    logins() {
      return this.$store.state.logins
    },
    profile() {
      return this.$store.state.profile
    },
  },
  watch: {
    isConnecting(isConnecting) {
      if (!isConnecting) {
        this.$nextTick(() => this.$nuxt.$loading.finish())
      }
    },
    isLogged: {
      immediate: true,
      handler(isLogged) {
        if (isLogged) {
          this.$idlock.fetchProfile()
          this.$idlock.fetchLogins()
        }
      },
    },
  },
  mounted() {
    this.$nextTick(() => this.$nuxt.$loading.start())
    this.$idlock.login()
  },
}
</script>

<style>
@import "~/assets/css/idlock.css";

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
