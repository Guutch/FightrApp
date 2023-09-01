// websocketMiddleware.js

let ws;

const websocketMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      // Initialize WebSocket connection
      ws = new WebSocket('ws://192.168:3001');
      
      ws.onopen = () => {
        console.log('WebSocket connection established');
        // store.dispatch(setWebSocketInstance(ws));
      };

      ws.onmessage = (event) => {
        const messageData = JSON.parse(event.data);
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
        ws.send(JSON.stringify(action.payload));
      }
      break;

    default:
      break;
  }

  return next(action);
};

export default websocketMiddleware;