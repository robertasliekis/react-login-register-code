import React, { useState } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { updateUser } from "../actions";

function EditUserInfo({ users, setActiveUser, onChange, loginStatus, updateUser }) {
  const { register, handleSubmit, getValues, errors } = useForm();

  const [userUpdated, setUserUpdate] = useState(false);

  const onSubmit = (data) => {
    Object.values(users).forEach((user, index) => {
      if (user.id === setActiveUser.id) {
        let newUserInfo = {
          index: index,
          id: setActiveUser.id,
          email: data.email,
          password: data.password,
        };
        updateUser(newUserInfo);
        setUserUpdate(true);
      }
    });
  };

  let emailValue;
  if (loginStatus) {
    emailValue = setActiveUser.email;
  } else {
    emailValue = "";
  }

  const [emailInput, setEmailInput] = useState(emailValue);

  function update(e) {
    setEmailInput(e.target.value);
  }

  if (loginStatus) {
    return (
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form-heading">EDIT USER INFO</h1>
        <div className="form-input">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              value={emailInput}
              onChange={update}
              name="email"
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
        <div className="message-container" style={{ opacity: userUpdated ? "1" : "0" }}>
          <div className="error-message green-text">Saved successfully</div>
        </div>
        <button className="btn btn-submit" type="submit">
          SAVE
        </button>
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

const mapDispatchToProps = {
  updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserInfo);
