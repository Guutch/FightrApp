import { useState } from 'react';
 
// To refresh last message
let shouldRefresh = false;

export const setShouldRefresh = (value) => {
  shouldRefresh = value;
};

export const getShouldRefresh = () => {
  return shouldRefresh;
};

// For Real Time Messaging
let chatId = null;

export const setChatId = (newChatId) => {
  chatId = newChatId;
};

export const getChatId = () => {
  return chatId;
};

// Refresh matches after unmatch/block/report
export const useShouldRefreshMatches = () => {
  const [shouldRefreshMatches, setShouldRefreshMatches] = useState(false);
  return [shouldRefreshMatches, setShouldRefreshMatches];
};

let shouldRefreshMatches = false;

export const setshouldRefreshMatches = (value) => {
  shouldRefreshMatches = value;
};

export const getshouldRefreshMatches = () => {
  return shouldRefreshMatches;
};

// let theMatches = [];

// export const setHigherMatches = (value) => {
//   theMatches = value;
// };

// export const getHigherMatches = () => {
//   return theMatches;
// };
