<template>
  <div>
    <v-app-bar :elevation="5" rounded>
      <v-app-bar-title>ISS project</v-app-bar-title>

      <template v-slot:append>
        <v-btn @click="router.push({path:'/validate'})">Zad 1/2</v-btn>
        <v-btn @click="router.push({name:'/search'})">Zad 3</v-btn>
        <v-btn @click="router.push({name:'/java'})">Zad 4</v-btn>
        <v-btn @click="router.push({name:'/weather'})">Zad 5</v-btn>
        <v-btn @click="router.push({name:'/secured'})">Zad 6</v-btn>
        <v-btn @click="router.push({name:'/login'})">Login</v-btn>
      </template>
    </v-app-bar>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()

</script>

<style lang="css" scoped></style>
