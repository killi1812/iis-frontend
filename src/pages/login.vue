<template>
  <div>
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field v-model="username" density="compact" placeholder="Username" prepend-inner-icon="mdi-email-outline"
        variant="outlined"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>

      <v-text-field v-model="password" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" density="compact" placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline" variant="outlined"
        @click:append-inner="visible = !visible"></v-text-field>

      <v-btn class="mb-8" color="blue" size="large" variant="tonal" block @click="loginFunc">
        Log In
      </v-btn>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { Login } from '../api/crud'
import { startPeriodicRefresh } from '../plugins/axios'
import router from '../router'
import { useAuthStore } from '../stores/auth'
// user providers
const authStore = useAuthStore()

// Variables
const visible = ref(false)
const username = ref("")
const password = ref("")

// Functions
const loginFunc = async () => {
  const tokens = await Login({
    username: username.value,
    password: password.value
  })

  if (tokens.status != 200) {
    //TODO: display error
    console.error(tokens.data)
  }

  //TODO: assign variables
  authStore.setToken(tokens.data)
  authStore.setUsername("admin")
  router.push({ name: '/secured' })
  startPeriodicRefresh()
}

</script>
