let shouldRefresh = false;

export const setShouldRefresh = (value) => {
  shouldRefresh = value;
};

export const getShouldRefresh = () => {
  return shouldRefresh;
};

let chatId = null;

export const setChatId = (newChatId) => {
  chatId = newChatId;
};

export const getChatId = () => {
  return chatId;
};