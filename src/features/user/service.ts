export const getUser = async () => {
	const response = await fetch('/api/user');
	return response.json();
};

export async function checkAuthStatus() {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
		credentials: 'include' // Important for sending cookies
	});
	if (!response.ok) {
		return null;
	}
	return await response.json();
}
export async function logout() {
	await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
		method: 'POST',
		credentials: 'include'
	});
}
