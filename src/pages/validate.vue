<template>
  <div class="container">
    validating xml rng and xsd
    <v-switch v-model="xsd" v-bind:label="xsd ? 'xsd' : 'rng'"></v-switch>
    <v-file-input v-model="file" clearable label="File input" variant="outlined"></v-file-input>
    <v-btn @click='upload'>Validate</v-btn>
    <div>
      <p>
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ValidateFile } from '../api/validation.ts'
const file = ref()
const xsd = ref(true)
const error = ref("")

async function upload() {
  if (file.value === undefined)
    return
  try {
    const res = await ValidateFile(file.value, xsd.value)
    if (res.data.status == "fail")
      error.value = res.data.error
    else {
      error.value = res.data.data
    }

  } catch (err: error) {
    console.log(err)
    error.value = err.response.data.error
  }

}
</script>

<style lang="css" scoped>
.container {
  margin: 5rem;
}
</style>
