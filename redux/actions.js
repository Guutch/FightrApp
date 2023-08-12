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
    dispatch(userLoggedIn(user.userId)); 
    if (callback) {
      callback();
    }
    return user;
  } catch (error) {
    console.error('[actions.js] Error logging in:', error);
  }
};

export const SET_PREFERENCES = 'SET_PREFERENCES';
export const UPDATE_PREFERENCES = 'UPDATE_PREFERENCES';

export const setPreferences = (preferences) => ({
  type: SET_PREFERENCES,
  payload: preferences,
});

export const updatePreferences = (preferences) => ({
  type: UPDATE_PREFERENCES,
  payload: preferences,
});
