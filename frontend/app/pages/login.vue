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
            <button @click="login" class="w-full bg-black text-white rounded py-2">Login</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/useAuthStore'

const email = ref('')
const password = ref('')
const loginStore = useAuthStore()

async function login() {
    await loginStore.login(email.value, password.value)
}


</script>