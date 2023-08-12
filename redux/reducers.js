import { SET_PREFERENCES, UPDATE_PREFERENCES } from './actions';

const initialState = {
  userId: null,
  preferences: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return {
        ...state,
        userId: action.payload,
      };
    case SET_PREFERENCES:
      return {
        ...state,
        preferences: action.payload,
      };
    case UPDATE_PREFERENCES:
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload },
      };
    default:
      return state;
  }
};

export default userReducer;
