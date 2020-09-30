import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { isLoggedIn, setActiveUser } from "../actions";

function Login({ users, isLoggedIn, userId, setActiveUser, loginStatus, onChange }) {
  const { register, handleSubmit, errors } = useForm();

  const [incorrectLogin, setIncorrectLogin] = useState(false);

  const [emailInput, setEmailInput] = useState("emailas");

  var userExist = false;

  const history = useHistory();

  const websiteName = "/react-login-register";
  //const websiteName = "";

  const onSubmit = (data) => {
    Object.values(users).forEach((user, index) => {
      if (user.email === data.email && user.password === data.password) {
        userExist = true;
        setActiveUser(user);
        isLoggedIn();
      }
    });
    if (userExist) {
      setIncorrectLogin(false);
      history.push(websiteName + "/user");
    } else {
      setIncorrectLogin(true);
    }
  };

  function update(e) {
    setEmailInput(e.target.value);
  }

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="form-heading">LOGIN</h1>
      <div className="form-input">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            onChange={update}
            name="email"
            placeholder="Email"
            ref={register({
              required: "*Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "*Invalid email address",
              },
            })}
          />
        </div>

        <div className="error-message">{errors.email && errors.email.message}</div>
      </div>
      <div className="form-input">
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            ref={register({ required: "*Password is required" })}
          />
        </div>

        <div className="error-message">{errors.password && <p>{errors.password.message}</p>}</div>
      </div>
      <div className="message-container">
        <div className="error-message" style={{ opacity: incorrectLogin ? 1 : 0 }}>
          *Incorrect email or password
        </div>
      </div>
      <button className="btn btn-submit" type="submit">
        LOGIN
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.addUser.users,
    setActiveUser: state.setActiveUser.userId,
    loginStatus: state.isLoggedIn.isLoggedIn,
  };
};

const mapDispatchToProps = {
  isLoggedIn,
  setActiveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
