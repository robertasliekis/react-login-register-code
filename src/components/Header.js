import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { burgerClicked: false };
    this.handleClickBurger = this.handleClickBurger.bind(this);
    this.handleLogoClicked = this.handleLogoClicked.bind(this);
  }

  handleClickBurger() {
    const currentBurgerMenuState = this.state.burgerClicked;
    this.setState({ burgerClicked: !currentBurgerMenuState });
  }

  handleLogoClicked() {
    this.setState({ burgerClicked: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.loginStatus !== prevProps.loginStatus) {
      this.setState({ burgerClicked: false });
    }
  }

  render() {
    const buttonClass = this.props.loginStatus ? null : "btn-last";
    let burgerClassName = this.state.burgerClicked ? "burger-menu-clicked" : null;

    const websiteName = "/react-login-register";
    //const websiteName = "";

    return (
      <div className="header">
        <div className="navbar">
          <Link className="logo-container" onClick={this.handleLogoClicked} to="/">
            REACT LOGIN
          </Link>
          <div className="menu-buttons">
            <Link
              className="btn btn-login"
              to={websiteName + "/"}
              style={{ display: this.props.loginStatus ? "none" : "flex" }}
            >
              Login
            </Link>
            <Link
              className="btn btn-register"
              to={websiteName + "/register"}
              style={{ display: this.props.loginStatus ? "none" : "flex" }}
            >
              Register
            </Link>
            <Link
              className="btn btn-user"
              to={websiteName + "/user"}
              style={{ display: this.props.loginStatus ? "flex" : "none" }}
            >
              User Info
            </Link>
            <Link
              className="btn btn-user-edit"
              to={websiteName + "/edit"}
              style={{ display: this.props.loginStatus ? "flex" : "none" }}
            >
              Edit User
            </Link>
            <Link className={"btn btn-about " + buttonClass} to={websiteName + "/about"}>
              About
            </Link>
            <Link
              className="btn btn-logout"
              to={websiteName + "/"}
              style={{ display: this.props.loginStatus ? "flex" : "none" }}
              onClick={() => this.props.isLoggedIn()}
            >
              Log Out
            </Link>
          </div>
          <div className={"burger-menu " + burgerClassName} onClick={this.handleClickBurger}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
        <div
          className="sidebar"
          style={{
            transform: this.state.burgerClicked ? "translateX(0%)" : "translateX(-100%)",
          }}
        >
          <div className="menu-buttons">
            <Link
              className="btn btn-login"
              onClick={this.handleClickBurger}
              to={websiteName + "/"}
              style={{ display: this.props.loginStatus ? "none" : "flex" }}
            >
              Login
            </Link>
            <Link
              className="btn btn-register"
              onClick={this.handleClickBurger}
              to={websiteName + "/register"}
              style={{ display: this.props.loginStatus ? "none" : "flex" }}
            >
              Register
            </Link>
            <Link
              className="btn btn-user"
              onClick={this.handleClickBurger}
              to={websiteName + "/user"}
              style={{ display: this.props.loginStatus ? "flex" : "none" }}
            >
              User Info
            </Link>
            <Link
              className="btn btn-user-edit"
              onClick={this.handleClickBurger}
              to={websiteName + "/edit"}
              style={{ display: this.props.loginStatus ? "flex" : "none" }}
            >
              Edit User
            </Link>
            <Link
              className={"btn btn-about " + buttonClass}
              onClick={this.handleClickBurger}
              to={websiteName + "/about"}
            >
              About
            </Link>
            <Link
              className="btn btn-logout"
              onClick={this.handleClickBurger}
              to={websiteName + "/"}
              style={{ display: this.props.loginStatus ? "flex" : "none" }}
              onClick={() => this.props.isLoggedIn()}
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.isLoggedIn.isLoggedIn,
  };
};

const mapDispatchToProps = (dispach) => {
  return {
    isLoggedIn: () => dispach({ type: "IS_LOGGED_IN" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
