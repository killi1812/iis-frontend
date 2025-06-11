<template>
  java

  <v-text-field class="mt-5" v-model="query" clearable label="Enter file name" variant="outlined">
  </v-text-field>
  <v-btn @click='Validate' :loading="loading">Validate</v-btn>
</template>

<script lang="ts" setup>
import { ValidateFile } from '../api/jaxb';

const query = ref("")
const loading = ref(false)

async function Validate() {
  if (query.value == "") return

  loading.value = true
  try {
    const rez = await ValidateFile(query.value)
    if (rez.status == "success") {
      console.log(rez.data)
    } else {
      console.log(rez.error)
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
  catch (e: any) {
    console.log(e)
  }
  finally {
    loading.value = false
  }
}
</script>
