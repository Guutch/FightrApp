// redux/actions.js
import axios from 'axios'; // make sure to install axios if you haven't already: npm install axios
import { loginUser } from '../api.js'; 

export const userLoggedIn = (userId) => ({
  type: 'USER_LOGGED_IN',
  payload: userId,
});

export const login = (email, password) => async (dispatch) => {
  try {
    const user = await loginUser(email, password);
    dispatch(userLoggedIn(user.userId));  // replace 'user._id' with the correct path to the user ID in your server's response
  } catch (error) {
    console.error('[actions.js] Error logging in:', error);
  }
};

// export const login = (email, password) => async (dispatch) => {
//   try {
//     const response = await axios.post('/login', { email, password });
//     dispatch(userLoggedIn(response.data.userId)); 
//   } catch (error) {
//     console.error('Error logging in:', error);
//   }
// };
