<template>
  java - JAXB validation
  <v-card class="mx-auto my-8" elevation="16" max-width="344" @click="Validate(file)" v-for="file in files"
    :loading="loading[file]">
    <v-card-item>
      <v-card-title>
        {{ file }}
      </v-card-title>
    </v-card-item>

    <v-card-text v-if="result[file]">
      {{ result[file] }}
    </v-card-text>
  </v-card>

</template>

<script lang="ts" setup>
// eslint-disable @typescript-eslint/no-explicit-any
import { ValidateFile } from '../api/jaxb';
import { getFiles } from '../api/validation';
const loading = ref({})
const files = ref([])
const result = ref({})

onMounted(async () => {
  await GetFiles()
})
async function GetFiles() {
  const rez = await getFiles()
  if (rez.data) {
    files.value = rez.data
  }
}

async function Validate(query: string) {
  if (query == "") return

  loading.value[query] = true
  try {
    const rez = await ValidateFile(query)
    if (rez.status == "success") {
      console.log(rez.data)
      result.value[query] = rez.data
    } else {
      console.log(rez.error)
      result.value[query] = rez.error.split(';').join("\n")
    }
  }
  catch (e: any) {
    console.log(e)
    result.value[query] = e
  }
  finally {
    loading.value[query] = false
  }
}
</script>
