import type { Profile } from 'passport-google-oauth20';

export function createUserFromProfile(profile: Profile) {
	return {
		id: profile.id,
		email: profile.emails?.[0]?.value ?? '',
		name: profile.displayName,
		picture: profile.photos?.[0]?.value
	};
}

export type User = ReturnType<typeof createUserFromProfile>;
