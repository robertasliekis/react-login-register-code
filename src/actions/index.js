export const addUser = (user) => {
  return {
    type: "REGISTER_USER",
    payload: user,
  };
};

export const updateUser = (user) => {
  return {
    type: "UPDATE_USER",
    payload: user,
  };
};

export const isLoggedIn = () => {
  return {
    type: "IS_LOGGED_IN",
  };
};

export const setActiveUser = (userId) => {
  return {
    type: "SET_USER_ID",
    payload: userId,
  };
};
