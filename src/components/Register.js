import React, { useState } from "react";
import { connect } from "react-redux";
import { addUser, isLoggedIn } from "../actions";
import { useForm } from "react-hook-form";

function Register({ users, addUser }) {
  const { register, handleSubmit, errors, getValues } = useForm();

  const [userExist, setUserExist] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const onSubmit = (data) => {
    var sameUser = false;
    Object.values(users).forEach((user) => {
      if (user.email === data.email) {
        setUserExist(true);
        sameUser = true;
      }
    });

    if (sameUser) {
      sameUser = false;
      setUserCreated(false);
    } else {
      setUserExist(false);
      setUserCreated(true);
      const newUser = { email: data.email, password: data.password };
      addUser(newUser);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="form-heading">REGISTER</h1>
      <div className="form-input">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            placeholder="Email"
            ref={register({
              required: "*Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
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
      <div className="form-input">
        <div>
          <label htmlFor="repeat_password">Repeat Password:</label>
          <input
            type="password"
            placeholder="Password"
            name="repeat_password"
            ref={register({
              required: "*Password is required",
              validate: (value) => {
                if (value === getValues()["password"]) {
                  return true;
                } else {
                  return "The passwords do not match";
                }
              },
            })}
          />
        </div>

        <div className="error-message">
          {errors.repeat_password && <p> {errors.repeat_password.message}</p>}
        </div>
      </div>
      <div className="message-container">
        <div className="error-message" style={{ opacity: userExist ? 1 : 0 }}>
          *User already exists
        </div>
        <div
          className="error-message green-text user-create-message"
          style={{ opacity: userCreated ? 1 : 0 }}
        >
          User created successfully!
        </div>
      </div>

      <button className="btn btn-submit" type="submit">
        REGISTER
      </button>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.addUser.users,
    loginStatus: state.isLoggedIn.isLoggedIn,
  };
};

const mapDispatchToProps = {
  addUser,
  isLoggedIn,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
