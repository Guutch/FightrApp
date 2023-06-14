// redux/actions.js
import axios from 'axios'; // make sure to install axios if you haven't already: npm install axios
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