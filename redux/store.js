import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userReducer from './reducers';

const middleware = getDefaultMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware,
});

export default store;
