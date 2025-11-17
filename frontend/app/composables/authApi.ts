export function useAuthApi(base: {}, authHeader: () => Record<string, string>) {
    async function fetchUser() {
        try {
            const response = await $fetch(`${base}/api/user`, {
                method: 'GET',
                headers: authHeader(),
            })
            return response
        } catch (error) {
            throw (error as any)?.data?.message || 'Failed to fetch user. Please try again.'
        }
    }

    async function login(email: string, password: string) {
        try {
            const response = await $fetch(`${base}/api/login`, {
                method: 'POST',
                headers: authHeader(),
                body: { email, password },
            })
            return response
        } catch (error) {
            throw (error as any)?.data?.message || 'Login failed. Please try again.'
        }
    }

    async function logout() {
        try {
            await $fetch(`${base}/api/logout`, {
                method: 'POST',
                headers: authHeader(),
            })
        } catch (error) {
            throw (error as any)?.data?.message || 'Logout failed. Please try again.'
        }
    }

    return { 
        fetchUser,
        login,
        logout 
    }
}