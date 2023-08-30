// store.js

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './reducers';
import websocketMiddleware from './websocketMiddleware';  // Import the new middleware

const middleware = [...getDefaultMiddleware(), websocketMiddleware];  // Add the new middleware to the array

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware,
});

export default store;
