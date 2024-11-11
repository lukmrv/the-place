export const getUser = async () => {
	const response = await fetch('/api/user');
	return response.json();
};

const API_URL = 'http://localhost:8080'; // Move this to config if needed

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
	const response = await fetch(`${API_URL}${endpoint}`, {
		...options,
		credentials: 'include',
		headers: {
			...options.headers,
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(`API error: ${response.statusText}`);
	}

	return response.json();
};

export async function checkAuthStatus() {
	const response = await fetch(`${API_URL}/auth/google`, {
		credentials: 'include' // Important for sending cookies
	});

	console.log('checkAuthStatus', response);

	if (!response.ok) {
		return null;
	}

	return await response.json();
}

export async function initiateGoogleLogin() {
	window.location.href = `${API_URL}/auth/google`;
}

export async function logout() {
	await fetch(`${API_URL}/auth/logout`, {
		method: 'POST',
		credentials: 'include'
	});
}
