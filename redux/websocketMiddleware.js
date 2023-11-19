// websocketMiddleware.js

import { setWebSocketInstance } from '../Backend/websocketInstance';

let ws;

const websocketMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      // Initialize WebSocket connection

      if (!action.payload) {
        console.error('User ID is not available. Skipping WebSocket initialization.');
        return next(action);
      }

      console.log("action.payload", action.payload)
      ws = new WebSocket(`wss://fytr-a7c0fafcc4ad.herokuapp.com?userID=${action.payload}`);


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
      
      ws.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
        if (messageData.type === 'NEW_MATCH') {
          store.dispatch({ type: 'SHOW_NOTIFICATION', payload: messageData });
        }
      };
      
      // ws.on('ping', function incoming() {
      //   ws.pong();  // Respond with a pong
      // });

      ws.onerror = (errorEvent) => {
        // Log the entire event object
        console.log('WebSocket Error Event:', errorEvent);
      
        // If there's a message property, log that
        if (errorEvent.message) {
          console.log('WebSocket Error Message:', errorEvent.message);
        }
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