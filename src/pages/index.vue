<template>
  <v-btn @click="test">ping</v-btn>
  <p>
    Status: {{ rez }}
  </p>
</template>

<script lang="ts" setup>
import { ping } from '@/api/example';
const rez = ref()

async function test() {
  const result = await ping()
  rez.value = result.statusText
}

</script>
