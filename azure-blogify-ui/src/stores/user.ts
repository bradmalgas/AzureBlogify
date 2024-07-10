import type { UserModel } from '@/models/user-model'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref({} as UserModel)
  const isLoggedIn = computed(() => {
    return (user.value !== null && user.value?.userRoles.includes('authenticated'))
  })
  const isAdmin = computed(() => {
    return (user.value !== null && user.value?.userRoles.includes('administrator'))
  })

  async function getUserInfo() {
    const response = await fetch('/.auth/me')
    const payload = await response.json()
    user.value = payload.clientPrincipal
    console.log(`User logged in = ${isLoggedIn.value}`)
  }

  return {
    getUserInfo,
    isLoggedIn,
    isAdmin,
  }
})
