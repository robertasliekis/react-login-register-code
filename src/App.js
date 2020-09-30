import React from "react";
import "./App.css";

import { connect } from "react-redux";

import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import About from "./components/About";
import UserInfo from "./components/UserInfo";
import EditUserInfo from "./components/EditUserInfo";
import WrongPage from "./components/WrongPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// "homepage": "https://robertasliekis.github.io/react-login-register/",

class App extends React.Component {
  render() {
    const websiteName = "/react-login-register";
    // const websiteName = "";

    return (
      <Router>
        <div className="App">
          <div className="website-wrapper">
            <Header />
            <div className="main-content">
              <Switch>
                <Route exact path={websiteName + "/"} component={Login} />
                <Route path={websiteName + "/register"} component={Register} />
                <Route path={websiteName + "/user"} component={UserInfo} />
                <Route path={websiteName + "/edit"} component={EditUserInfo} />
                <Route path={websiteName + "/about"} component={About} />
                <Route path="*" component={WrongPage} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginStatus: state.isLoggedIn.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
