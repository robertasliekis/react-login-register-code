const initialState = {
  isLoggedIn: false,
};

const isLoggedIn = (state = initialState, action) => {
  switch (action.type) {
    case "IS_LOGGED_IN":
      return { ...state, isLoggedIn: !state.isLoggedIn };
    default:
      return state;
  }
};

export default isLoggedIn;
