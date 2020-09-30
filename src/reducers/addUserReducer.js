const initialState = {
  users: [
    { id: "id1", email: "user1@mail.com", password: "123" },
    {
      id: "id2",
      email: "user2@mail.com",
      password: "123",
    },
    {
      id: "id3",
      email: "123@123.lt",
      password: "123",
    },
  ],
};

const userAdder = (state = initialState, action) => {
  switch (action.type) {
    case "REGISTER_USER":
      return { ...state, users: state.users.concat(action.payload) };
    case "UPDATE_USER":
      let updatedUsers = [...state.users];
      updatedUsers[action.payload.index] = {
        id: action.payload.id,
        email: action.payload.email,
        password: action.payload.password,
      };
      return { ...state, users: updatedUsers };
    default:
      return state;
  }
};

export default userAdder;
