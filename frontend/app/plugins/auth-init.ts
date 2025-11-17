import { useAuthStore } from '~/stores/useAuthStore'
export default defineNuxtPlugin(() => {
    const auth = useAuthStore();
    auth.loadFromCookies();
  });
  