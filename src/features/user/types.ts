export type User = {
	id: string;
	email: string;
	name: string | undefined;
	picture: string | undefined;
	role: 'user' | 'moderator' | 'admin';
};
