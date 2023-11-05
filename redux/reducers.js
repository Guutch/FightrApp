import { SET_PREFERENCES, UPDATE_PREFERENCES, UPDATE_FIGHTING_LEVEL, UPDATE_WEIGHT } from './actions';

const initialState = {
  userId: null,
  preferences: {},
  ws: null,
  isAuthenticated: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return {
        ...state,
        userId: action.payload,
        isAuthenticated: true,
      };
      case 'USER_LOGGED_OUT':
      return {
        ...state,
        userId: null,
        isAuthenticated: false,
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
    case UPDATE_WEIGHT:
      return {
        ...state,
        preferences: {
          ...state.preferences,
          weight_range: action.weightClass
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
    // Inside your Redux reducer
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        showRedDot: true,
      };

    default:
      return state;
  }
};

export default userReducer;