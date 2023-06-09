// redux/reducers.js
const initialState = {
    userId: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'USER_LOGGED_IN':
        return {
          ...state,
          userId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  