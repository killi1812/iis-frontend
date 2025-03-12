// src/stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    //TODO check how to make it undefinded
    username: "",
    jwt: "",
    refresh: "",
  }),
  actions: {
    logout() {
      this.isLoggedIn = false
      this.refresh = ""
      this.jwt = ""
      this.username = ""
    },
    setUsername(username: string) {
      this.username = username
    },
    getJwtToken() {
      if (this.jwt == "") return undefined;
      return this.jwt
    },
    setToken(token: string) {
      this.isLoggedIn = true
      this.jwt = token
      this.refresh = token
    }
  }
})
