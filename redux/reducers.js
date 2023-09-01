import { SET_PREFERENCES, UPDATE_PREFERENCES, UPDATE_FIGHTING_LEVEL } from './actions';

const initialState = {
  userId: null,
  preferences: {},
  ws: null,
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
      case UPDATE_FIGHTING_LEVEL:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          fightingLevel: action.payload
        },
      };
      case 'SET_WEBSOCKET_INSTANCE':
      return {
        ...state,
        ws: action.payload,
      };
    case 'CLEAR_WEBSOCKET_INSTANCE':
      return {
        ...state,
        ws: null,
      };
    default:
      return state;
  }
};

export default userReducer;