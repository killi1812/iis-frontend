<template>
  SOAP api for searching
  <v-text-field class="mt-5" v-model="query" clearable label="Enter a city in Croatia" variant="outlined">
  </v-text-field>

  <v-btn @click="searchUserInfo">Search</v-btn>
</template>

<script lang="ts" setup>
import { parse } from 'node:path/posix'


const query = ref(null)
const result = ref()

async function searchUserInfo() {
  if (query.value == undefined || query.value === "") {
    result.value = []
    return
  }

  const rez = await callSoapFromBrowser(query.value)

  console.log(rez)
  result.value = rez
}
async function callSoapFromBrowser(username: string): Promise<string> {
  const url = "http://localhost:5206/user-info"
  const soapAction = "user-info"
  const soapXml = `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetUserInfo xmlns="http://tempuri.org/">
<username>${username}</username>
    </GetUserInfo>
  </soap:Body>
</soap:Envelope>`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/xml;charset=UTF-8',
        'SOAPAction': soapAction
      },
      body: soapXml
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("SOAP Request Failed Raw Response:", errorText);
      // Try parsing for a SOAP Fault even on HTTP error
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const responseXmlText = await response.text();
    console.log("Raw XML Response:", responseXmlText);

    // Attempt to parse the response XML

    return responseXmlText; // Return raw XML

  } catch (error) {
    console.error("Error during SOAP call:", error);
    throw error;
  }
}
</script>
