import type { UserModel } from '@/models/user-model'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref({} as UserModel)
  const isLoggedIn = computed(() => {
    if (!isEmpty()) {return user.value.userRoles.includes('authenticated')}
    return false
  })
  const isAdmin = computed(() => {
    if (!isEmpty()) {return user.value.userRoles.includes('administrator')}
    return false
  })

  async function getUserInfo() {
    const response = await fetch('/.auth/me')
    const payload = await response.json()
    user.value = payload.clientPrincipal
    console.log(`User logged in = ${isLoggedIn.value}`)
  }

  function isEmpty() {
    return Object.keys(user.value).length == 0
  }

  return {
    getUserInfo,
    isLoggedIn,
    isAdmin
  }
})
