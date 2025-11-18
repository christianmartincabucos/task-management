import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useApi } from '~/composables/useApi'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<any>(null)
  const errorMessage = ref<string | null>(null)
  const isLoaded = ref(false)
  const api = useApi()

  const cookieToken = useCookie<string | null>('token', {
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })


  const loadFromCookies = () => {
    token.value = cookieToken.value || null
    isLoaded.value = true
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password) as { access_token: string }

      token.value = response.access_token
      cookieToken.value = response.access_token

      errorMessage.value = null

    } catch (err: any) {
      errorMessage.value = err?.message ?? 'Login failed'
    }
  }

  const logout = async () => {
    try {
      await api.logout()

      token.value = null
      user.value = null
      cookieToken.value = null
      errorMessage.value = null

      const { navigateTo } = await import('#app')
      navigateTo('/login')
    } catch (err: any) {
      errorMessage.value = err?.message ?? 'Logout failed'
    }
  }

  const fetchUser = async () => {
    if (!token.value) {
      user.value = null
      return false
    }

    try {
      const { data } = await api.fetchUser() as { data: any }
      user.value = data
      errorMessage.value = null
      return true
    } catch (err: any) {
      user.value = null
      errorMessage.value = err?.message ?? 'Failed to fetch user'
      return false
    }
  }

  return {
    // state
    token,
    user,
    errorMessage,
    isLoaded,

    // actions
    loadFromCookies,
    login,
    logout,
    fetchUser,
  }
})
