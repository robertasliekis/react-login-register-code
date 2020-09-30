import React from "react";
import { connect } from "react-redux";

//unction Users({ users, extraUsers }) {
function Users({ users, isLoggedIn }) {
  return (
    <div>
      {users.map((user, index) => {
        return (
          <h1 key={index}>
            {user.email} {user.password}
          </h1>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.addUser.users,
    isLoggedIn: state.isLoggedIn.isLoggedIn,
  };
};

export default connect(mapStateToProps)(Users);
