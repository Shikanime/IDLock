<template>
  <div class="m-8">
    <div class="flex flex-col divide-y">
      <div class="flex gap-5 pb-4">
        <h2 class="font-bold">
          Create New Login
        </h2>
      </div>
      <form class="flex flex-col gap-4 pt-5" @submit.prevent="handleSubmit">
        <div class="flex flex-col gap-2">
          <div class="flex items-center">
            <div class="w-2/12">
              <label class="idl-input-label" for="name">
                Name
              </label>
            </div>
            <div class="w-10/12">
              <input
                id="name"
                v-model="name"
                :class="errors.name ? ['idl-input--error'] : []"
                class="idl-input"
                type="text"
              />
              <div class="idl-input-status">
                {{ errors.name }}
              </div>
            </div>
          </div>

          <div class="flex items-center">
            <div class="w-2/12">
              <label class="idl-input-label" for="username">
                Username
              </label>
            </div>
            <div class="w-10/12">
              <input
                id="username"
                v-model="username"
                :class="errors.username ? ['idl-input--error'] : []"
                class="idl-input"
                type="text"
              />
              <div class="idl-input-status">
                {{ errors.username }}
              </div>
            </div>
          </div>

          <div class="flex items-center">
            <div class="w-2/12">
              <label class="idl-input-label" for="password">
                Password
              </label>
            </div>
            <div class="w-10/12">
              <input
                id="password"
                v-model="password"
                :class="errors.password ? ['idl-input--error'] : []"
                class="idl-input"
                type="password"
              />
              <div class="idl-input-status">
                {{ errors.password }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <div class="w-2/12"></div>
          <div class="flex w-10/12 gap-5">
            <input class="idl-button" type="submit" value="Save" />
            <button class="idl-button" @click="$router.push('/')">
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

      await this.$idlock.createLogin({
        name: this.name,
        username: this.username,
        password: this.password,
      })

      this.push(`/${this.name}`)
    },
  },
}
</script>
