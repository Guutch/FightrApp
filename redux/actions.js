// redux/actions.js
import axios from 'axios';
import { loginUser } from '../api.js'; 

export const userLoggedIn = (userId) => ({
  type: 'USER_LOGGED_IN',
  payload: userId,
});

export const login = (email, password, callback) => async (dispatch) => {
  try {
    const user = await loginUser(email, password);
    console.log("user gets logged in", user)
    dispatch(userLoggedIn(user.userId)); 
    if (callback) {
      callback();
    }
    return user;
  } catch (error) {
    console.log('[actions.js] Error logging in lol:', error);
  }
};

export const SET_PREFERENCES = 'SET_PREFERENCES';
export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';

export const userLoggedOut = () => ({
  type: 'USER_LOGGED_OUT',
});

export const setPreferences = (preferences) => ({
  type: SET_PREFERENCES,
  payload: preferences,
});

export const updatePreferences = (preferences) => ({
  type: UPDATE_PREFERENCES,
  payload: preferences,
});

// Action Types
export const UPDATE_FIGHTING_LEVEL = 'UPDATE_FIGHTING_LEVEL';

// Action Creators
export const updateFightingLevelEdit = (fightingLevel) => ({
  type: UPDATE_FIGHTING_LEVEL,
  payload: fightingLevel,
});

// JUST ADDED FOR WEIGHT //
export const UPDATE_WEIGHT = 'UPDATE_WEIGHT';

// JUST ADDED FOR WEIGHT //
export const updateWeight = (weightClass) => ({
  type: UPDATE_WEIGHT,
  payload: weightClass,
});

export const sendMessage = (message, recipientId) => ({
  type: 'SEND_MESSAGE',
  payload: { message, recipientId },
});

export const setWebSocketInstance = (ws) => ({
  type: 'SET_WEBSOCKET_INSTANCE',
  payload: ws,
});

export const showNotification = (payload) => {
  return {
    type: 'SHOW_NOTIFICATION',
    payload,
  };
};


// export const clearWebSocketInstance = () => ({
//   type: 'CLEAR_WEBSOCKET_INSTANCE',
// });