import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/composables/useApi'

export const useAuthStore = defineStore('login', () => {
    const token = ref<string | null>(null)
    const errorMessage = ref<string | null>(null)
    const api = useApi()
    const router = useRouter()
    const user = ref<any>(null)
    const cookieToken = useCookie('token');
    const isLoaded = ref(false);

    const loadFromCookies = () => {
        if (cookieToken.value) {
          token.value = cookieToken.value;
        }
        isLoaded.value = true; // prevents hydration mismatches
      }
    
    const login = async (email: string, password: string) => {
        try {
            const response = await api.login(email, password) as { access_token: string }

            // Save the token in localStorage or sessionStorage (client-side only)
            // token.value = response.access_token
            cookieToken.value = response.access_token;

            // if (process.client) {
            //     sessionStorage.setItem('authToken', response.access_token)
            // }

            // Clear any previous error messages
            errorMessage.value = null

            // Navigate to the home page
            router.push('/')
        } catch (error) {
            // Handle errors (e.g., invalid credentials)
            errorMessage.value = String(error)
        }
    }

    const logout = async () => {
        try {
            await api.logout()

            // Clear the token and reset the state
            cookieToken.value = null
            // if (process.client) {
            //     sessionStorage.removeItem('authToken')
            // }
            errorMessage.value = null

            // Navigate to the login page
            router.push('/login')
        } catch (error) {
            errorMessage.value = error as string
        }
    }

    const fetchUser = async () => {
        try {
            const { data } = await api.fetchUser() as { data: any }
            user.value = data
            errorMessage.value = null
            return true
        } catch (error) {
            user.value = null
            errorMessage.value = error instanceof Error ? error.message : String(error)
            return false
        }
    }

    // const isLoggedIn = () => {
    //     if (process.client) {
    //         const sessionToken = sessionStorage.getItem('authToken')
    //         return !!token.value || !!sessionToken
    //     }
    //     return !!token.value
    // }

    return {
        token,
        errorMessage,
        fetchUser,
        // isLoggedIn,
        loadFromCookies,
        isLoaded,
        user,
        login,
        logout,
    }
})