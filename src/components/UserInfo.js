import React from "react";
import { connect } from "react-redux";

function UserInfo({ setActiveUser, loginStatus }) {
  if (loginStatus) {
    const emailValue = setActiveUser.email;
    return (
      <form className="form-container">
        <h1 className="form-heading">USER INFO</h1>
        <p>User {emailValue} is logged in</p>
      </form>
    );
  } else {
    return (
      <div>
        <h1>You have to log-in</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.addUser.users,
  setActiveUser: state.setActiveUser.userId,
  loginStatus: state.isLoggedIn.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
