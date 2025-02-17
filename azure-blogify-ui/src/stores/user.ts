import type { UserModel } from '@/models/user-model'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref({} as UserModel)
  const isLoggedIn = computed(() => {
    if (!isEmpty()) {
      return user.value.userRoles.includes('authenticated')
    }
    return false
  })
  const isAdmin = computed(() => {
    if (!isEmpty()) {
      return user.value.userRoles.includes('administrator')
    }
    return false
  })

  async function getUserInfo() {
    const response = await fetch('/.auth/me')
    const payload = await response.json()
    user.value = payload.clientPrincipal
    try {
      const response = await fetch('/.auth/me')

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const payload = await response.json()
      if (payload?.clientPrincipal != null) user.value = payload.clientPrincipal
    } catch (error: any) {
      console.error('Error occured:', error.message)
    }
  }

  function isEmpty() {
    return Object.keys(user?.value)?.length == 0
  }

  return {
    getUserInfo,
    isLoggedIn,
    isAdmin,
    user
  }
})
