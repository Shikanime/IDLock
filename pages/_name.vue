<template>
  <div class="m-8">
    <div class="flex flex-col divide-y">
      <div class="flex gap-5 pb-4">
        <h2 class="font-bold">
          Create New Login
        </h2>
        <div class="flex-grow"></div>
        <button>Edit</button>
        <button>Remove</button>
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
              <div>{{ name }}</div>
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
              <div>{{ username }}</div>
              <button
                v-clipboard:copy="username"
                class="px-8 py-2 font-bold text-white bg-purple-500 rounded shadow hover:bg-purple-500 focus:shadow-outline focus:outline-none"
              >
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
              <div>{{ password }}</div>
              <button
                v-clipboard:copy="password"
                class="px-8 py-2 font-bold text-white bg-purple-500 rounded shadow hover:bg-purple-500 focus:shadow-outline focus:outline-none"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      username: "",
      password: "",
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
          const login = await this.$idlock.getLogin(this.$route.params.name)
          this.name = login.name
          this.username = login.username
          this.password = login.password
        }
      },
    },
  },
}
</script>
