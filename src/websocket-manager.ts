export const webSocketManager = () => {
	const wsUri = 'ws://localhost:8081/ws';

	const ws = new WebSocket(wsUri);

	// ws.onopen = () => {
	// 	console.log('CONNECTED');
	// 	onOpen();
	// };

	// ws.onclose = () => {
	// 	console.log('DISCONNECTED');
	// 	onClose();
	// };

	// ws.onmessage = (e) => {
	// 	console.log(`RECEIVED: ${e.data}`);
	// 	onMessage();
	// };

	// ws.onerror = (e) => {
	// 	onError();
	// };

	return ws;
};
