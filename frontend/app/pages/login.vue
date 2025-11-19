<template>
    <div class="h-screen flex items-center justify-center">
        <div class="w-full max-w-md bg-white rounded-xl p-8 shadow">
            <div class="text-center mb-6">
                <div class="text-xl font-bold">Sign In</div>
                <div class="text-sm text-gray-500">Login to continue using this app</div>
            </div>
            <label class="block text-xs text-gray-600">Email</label>
            <input v-model="email" class="w-full border rounded p-2 mb-4" />
            <label class="block text-xs text-gray-600">Password</label>
            <input type="password" v-model="password" class="w-full border rounded p-2 mb-4" />
            <button
                @click="login"
                :disabled="isLoading"
                class="w-full bg-black text-white rounded py-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg
                    v-if="isLoading"
                    class="animate-spin h-5 w-5 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                <span>{{ isLoading ? 'Logging in...' : 'Login' }}</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'

const email = ref('')
const password = ref('')
const isLoading = ref(false) // Loading state
const authStore = useAuthStore()

async function login() {
    if (isLoading.value) return // Prevent multiple clicks

    isLoading.value = true // Set loading state to true
    await authStore.login(email.value, password.value)

    if (authStore.token) {
        isLoading.value = false // Reset loading state
        return navigateTo('/')
    }

    alert(authStore.errorMessage || 'Login failed')
    isLoading.value = false // Reset loading state
}


</script>