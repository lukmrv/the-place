// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: UserSession | undefined;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

// Add to your existing types
interface UserData {
	id: string;
	email: string;
	name: string;
	// Add other user fields as needed
}

declare global {
	namespace App {
		interface PageData {
			user?: UserData;
		}
		// ... other existing interfaces
	}
}

export {};
