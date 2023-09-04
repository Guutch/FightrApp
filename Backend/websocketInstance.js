let wsInstance = null;

export const setWebSocketInstance = (ws) => {
  wsInstance = ws;
};

export const getWebSocketInstance = () => {
  return wsInstance;
};
