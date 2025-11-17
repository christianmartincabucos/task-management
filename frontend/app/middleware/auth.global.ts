import { useAuthStore } from '~/stores/useAuthStore'

export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore()

  // 1. Not logged in → accessing protected page → redirect to login
  if (!auth.isLoaded && to.path !== '/login') {
    return navigateTo('/login')
  }
  
  // 2. Logged in → trying to access login page → redirect to dashboard
  if (auth.isLoaded && to.path === '/login') {
    console.log('redirecting to home from login');
    
    return navigateTo('')
  }
})
