<template>
  <h1>
    secure rest api
  </h1>

  <p v-if="errMessage">
    error: {{ errMessage }}
  </p>
</template>

<script lang="ts" setup>
import { GetAllUser } from '../api/crud';
import { UserDto } from '../models/UserDto';

// Use Providers
const router = useRouter()

// Variables
const users = ref<UserDto[]>([])
const errMessage = ref<string | undefined>()

// Hooks
onMounted(async () => {
  const rez = await GetAllUser()
  if (rez.status != 200) {
    errMessage.value = rez.statusText
    if (rez.status == 401) {
      router.push({ name: '/login' })
    }
  }
  console.log(rez)
  users.value = rez
})

</script>
