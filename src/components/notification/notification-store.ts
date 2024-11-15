import { writable } from 'svelte/store';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
	id: string;
	type: NotificationType;
	message: string;
	duration: number;
}

const createNotificationStore = () => {
	const { subscribe, update } = writable<Notification[]>([]);

	const remove = (id: string) => {
		update((notifications) => notifications.filter((n) => n.id !== id));
	};

	const removeDuplicates = (newNotification: Omit<Notification, 'id'>) => {
		update((notifications) =>
			notifications.filter(
				(n) => !(n.message === newNotification.message && n.type === newNotification.type)
			)
		);
	};

	return {
		subscribe,
		remove,
		add: (notification: Omit<Notification, 'id'>) => {
			removeDuplicates(notification);

			const id = crypto.randomUUID();
			const duration = notification.duration ?? 3000;
			update((notifications) => [...notifications, { ...notification, id, duration }]);

			if (duration !== Infinity) {
				setTimeout(() => {
					remove(id);
				}, duration);
			}
		}
	};
};

export const notifications = createNotificationStore();

export const addNotification = (notification: Omit<Notification, 'id'>) => {
	notifications.add(notification);
};
