export function useApi() {
    const config = useRuntimeConfig();
    const base = config.public.apiBase;
    const auth = useAuthStore()
    const cookieToken = useCookie('token').value;

    console.log('Cookie Token in useApi:', cookieToken);
    
    const authHeader = ():Record<string, string> => {
        return cookieToken ? { Authorization: `Bearer ${cookieToken}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' };
    }

    const taskApi = useTaskApi(base, authHeader);
    const authApi = useAuthApi(base, authHeader);

    return { ...taskApi, ...authApi };
}