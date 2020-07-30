<template>
  <div class="m-8">
    <div class="flex flex-col divide-y">
      <template v-if="login">
        <div class="flex gap-5 pb-4">
          <h2 class="font-bold">
            Create New Login
          </h2>
          <div class="flex-grow"></div>
          <button>Edit</button>
          <button @click="$idlock.removeLogin(login.name)">Remove</button>
        </div>
        <div class="flex flex-col gap-4 pt-5">
          <div class="flex flex-col gap-2">
            <div class="flex items-center">
              <div class="w-2/12">
                <label
                  class="block pr-4 mb-0 font-bold text-right text-gray-500"
                  for="name"
                >
                  Name
                </label>
              </div>
              <div class="w-10/12">
                <div>{{ login.name }}</div>
              </div>
            </div>

            <div class="flex items-center">
              <div class="w-2/12">
                <label
                  class="block pr-4 mb-0 font-bold text-right text-gray-500"
                  for="username"
                >
                  Username
                </label>
              </div>
              <div class="w-10/12">
                <div>{{ login.username }}</div>
                <button v-clipboard:copy="login.username" class="idl-button">
                  Copy
                </button>
              </div>
            </div>

            <div class="flex items-center">
              <div class="w-2/12">
                <label
                  class="block pr-4 mb-0 font-bold text-right text-gray-500"
                  for="password"
                >
                  Password
                </label>
              </div>
              <div class="w-10/12">
                <div>{{ login.password }}</div>
                <button v-clipboard:copy="login.password" class="idl-button">
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="flex gap-5 pb-4">
          <h2 class="font-bold">No login for {{ $route.params.name }}</h2>
          <div class="flex-grow"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLogged() {
      return this.$store.state.isLogged
    },
    login() {
      return this.$store.state.logins.find(
        (l) => l.name === this.$route.params.name
      )
    },
  },
  watch: {
    isLogged: {
      immediate: true,
      handler(isLogged) {
        if (isLogged) {
          this.$idlock.fetchLogin(this.$route.params.name)
        }
      },
    },
  },
}
</script>
