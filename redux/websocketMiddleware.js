// websocketMiddleware.js

import { setWebSocketInstance } from '../Backend/websocketInstance';

let ws;

const websocketMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      // Initialize WebSocket connection
      console.log("action.payload", action.payload)
      ws = new WebSocket(`ws://192.168.1.14:3001?userID=${action.payload}`);

      ws.onopen = () => {
        console.log('WebSocket connection established');
        setWebSocketInstance(ws);
      };

      ws.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        console.log(`Received message: ${JSON.stringify(messageData)}`);
        // Dispatch an action to update Redux store
        store.dispatch({ type: 'RECEIVE_MESSAGE', payload: messageData });
      };
      

      ws.onerror = (error) => {
        console.log(error)
        console.log(`WebSocket Error: ${error}`);
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
      };
      break;

    case 'USER_LOGGED_OUT':
      // Close WebSocket connection
      if (ws) {
        ws.close();
      }
      break;

      case 'SEND_MESSAGE':
        // Send message through WebSocket
        if (ws && ws.readyState === WebSocket.OPEN) {
          const messageToSend = {
            type: 'chat',
            targetUserId: action.payload.recipientId,  // Use recipientId as targetUserId
            content: action.payload.message,
          };
          ws.send(JSON.stringify(messageToSend));
        }
        break;
      

    default:
      break;
  }

  return next(action);
};

export default websocketMiddleware;