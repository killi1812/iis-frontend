<template>
  <div>
    <v-app-bar :elevation="5" rounded>
      <v-app-bar-title @click="router.push({ path: '/' })">ISS project</v-app-bar-title>

      <template v-slot:append>
        <v-btn @click="router.push({ name: '/validate' })">Zad 1/2</v-btn>
        <v-btn @click="router.push({ name: '/search' })">Zad 3</v-btn>
        <v-btn @click="router.push({ name: '/java' })">Zad 4</v-btn>
        <v-btn @click="router.push({ name: '/weather' })">Zad 5</v-btn>
        <v-btn @click="router.push({ name: '/secured' })">Zad 6</v-btn>
        <v-btn v-if="!authStore.isLoggedIn" @click="router.push({ name: '/login' })">Login</v-btn>
        <v-btn v-else @click="logout">{{ authStore.username }} | Logout</v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script setup lang="ts">
import { stopPeriodicRefresh } from '../plugins/axios';
import { useAuthStore } from '../stores/auth';

const router = useRouter()
const authStore = useAuthStore()

async function logout() {
  authStore.logout()
  stopPeriodicRefresh()
  await router.push({ name: '/login' })
}

</script>

<style lang="css" scoped></style>
