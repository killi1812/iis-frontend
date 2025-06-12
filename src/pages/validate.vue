<template>
  <h3>validating xml rng and xsd</h3>

  <v-switch v-model="xsd" v-bind:label="xsd ? 'xsd' : 'rng'" />
  <v-file-input v-model="file" clearable label="File input" variant="outlined" />
  <v-btn @click='upload' :loading="loading">Validate</v-btn>
  <p>
    {{ error }}
  </p>
</template>

<script lang="ts" setup>
import { ValidateFile } from '../api/validation.ts'
const file = ref()
const xsd = ref(true)
const error = ref("")
const loading = ref(false)

async function upload() {
  if (file.value === undefined)
    return

  loading.value = true
  try {
    const res = await ValidateFile(file.value, xsd.value)
    if (res.data.status == "fail")
      error.value = res.data.error
    else {
      error.value = res.data.data
    }

  } catch (err: any) {
    error.value = err.response.data.error
  }
  finally {
    loading.value = false
  }

}
</script>
