import React, { Component } from "react";
import { connect } from "react-redux";
import { addUser } from "../actions";

export class RegisterOld extends Component {
  constructor(props) {
    super(props);
    this.state = { emailInput: "", submittedValue: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ submittedValue: this.state.value });
    this.props.addUser(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form action="" className="form-input form-login" onSubmit={this.handleSubmit}>
          <h2>Register</h2>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={this.state.emailInput}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password
            "
            >
              Password
            </label>
            <input type="password" placeholder="Enter your password" name="password" />
          </div>
          <div>
            <label
              htmlFor="password
            "
            >
              Repeat Password
            </label>
            <input type="password" placeholder="Enter your password" name="password" />
          </div>
          <input type="submit" className="btn btn-register" value="Register" />
        </form>
        {this.props.users.map((user, index) => {
          return (
            <h1 key={index}>
              {user.email} {user.password}
            </h1>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  };
};

const mapDispatchToProps = () => {
  return {
    addUser,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(RegisterOld);
