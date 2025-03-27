<template>
  <h3> XML-RPC api for getting weather</h3>

  <v-text-field class="mt-5" v-model="query" clearable label="Enter a city in Croatia"
    variant="outlined"></v-text-field>

  <v-btn @click="searchWeather">Search</v-btn>

  <div v-if="results.length != 0" class="mt-5">
    <v-table>
      <thead>
        <tr>
          <th class="text-left">
            Location
          </th>
          <th class="text-left">
            Temperature
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in results" :key="item.location">
          <td>{{ item.location }}</td>
          <td>{{ item.temp }}°</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script lang="ts" setup>
import { GetTemperature, WeatherRez } from '../api/weather'

const query = ref(null)
const results = ref<WeatherRez[]>([])

async function searchWeather() {
  if (query.value == undefined || query.value === "") {
    results.value = []
    return
  }
  const rez = await GetTemperature([query.value])
  results.value = rez
}

//function decodeXml() { }
</script>
