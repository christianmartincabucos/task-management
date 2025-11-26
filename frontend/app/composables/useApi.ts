export function useApi() {
    const config = useRuntimeConfig();
    const base = config.public.apiBase;
    const auth = useAuthStore()
    const cookieToken = useCookie('token').value;

    const authHeader = ():Record<string, string> => {
        return cookieToken ? { 
            Authorization: `Bearer ${cookieToken}`, 
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '1'
        } : { 
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '1'
        };    
    }

    const taskApi = useTaskApi(base, authHeader);
    const authApi = useAuthApi(base, authHeader);

    return { ...taskApi, ...authApi };
}