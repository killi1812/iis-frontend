// src/stores/auth.ts
import { defineStore } from 'pinia'
import { TokensDto } from '../models/tokensDto'

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false)
  const username = ref<string | undefined>(undefined)
  const jwt = ref("")
  const refresh = ref<string | undefined>(undefined)

  function logout() {
    isLoggedIn.value = false
    refresh.value = ""
    jwt.value = ""
    username.value = undefined
  }

  function setUsername(userName: string) {
    username.value = userName
  }

  function getJwtToken() {
    if (jwt.value == "") return undefined;
    return jwt.value
  }

  function setToken(token: TokensDto) {
    isLoggedIn.value = true
    jwt.value = token.access_token
    refresh.value = token.refresh_token
  }

  return { isLoggedIn, username, refresh, logout, setUsername, getJwtToken, setToken }
})
