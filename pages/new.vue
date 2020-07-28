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
      <form class="flex flex-col gap-4 pt-5" @submit.prevent="submit">
        <div class="flex flex-col gap-2">
          <div class="flex items-center">
            <div class="w-2/12">
              <label
                class="block pr-4 font-bold text-right text-gray-500"
                for="name"
              >
                Name
              </label>
            </div>
            <div class="w-10/12">
              <input
                id="name"
                v-model="name"
                :class="errors.name ? ['border-red-500'] : []"
                class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
              />
              <div class="h-6 text-xs italic text-red-500">
                {{ errors.name }}
              </div>
            </div>
          </div>

          <div class="flex items-center">
            <div class="w-2/12">
              <label
                class="block pr-4 font-bold text-right text-gray-500"
                for="username"
              >
                Username
              </label>
            </div>
            <div class="w-10/12">
              <input
                id="username"
                v-model="username"
                :class="errors.username ? ['border-red-500'] : []"
                class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
              />
              <div class="h-6 text-xs italic text-red-500">
                {{ errors.username }}
              </div>
            </div>
          </div>

          <div class="flex items-center">
            <div class="w-2/12">
              <label
                class="block pr-4 font-bold text-right text-gray-500"
                for="password"
              >
                Password
              </label>
            </div>
            <div class="w-10/12">
              <input
                id="password"
                v-model="password"
                :class="errors.password ? ['border-red-500'] : []"
                class="w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border-2 border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-purple-500"
                type="password"
              />
              <div class="h-6 text-xs italic text-red-500">
                {{ errors.password }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <div class="w-2/12"></div>
          <div class="flex w-10/12 gap-5">
            <input
              class="px-8 py-2 font-bold text-white bg-purple-500 rounded shadow hover:bg-purple-500 focus:shadow-outline focus:outline-none"
              type="submit"
              :class="errors.px ? ['border-red-500'] : []"
              value="Save"
            />
            <button
              class="px-8 py-2 font-bold text-white bg-purple-500 rounded shadow hover:bg-purple-500 focus:shadow-outline focus:outline-none"
              @click="$router.push('/')"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
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
      errors: {
        name: null,
        username: null,
        password: null,
      },
    }
  },
  methods: {
    async submit() {
      if (this.username === "") {
        this.errors.username = "username can't be blank"
      } else {
        this.errors.username = null
      }

      if (this.name === "") {
        this.errors.name = "name can't be blank"
      } else {
        this.errors.name = null
      }

      if (this.password === "") {
        this.errors.password = "password can't be blank"
      } else {
        this.errors.password = null
      }

      if (
        !!this.errors.name ||
        !!this.errors.username ||
        !!this.errors.password
      ) {
        return
      }

      const result = await this.$idlock.createLogin({
        name: this.name,
        username: this.username,
        password: this.password,
      })

      if (result instanceof Error) {
        console.error(`fail to create login because: ${result}`)
      } else {
        console.debug(`login created with ${this.username} for ${this.name}`)
      }
    },
  },
}
</script>
