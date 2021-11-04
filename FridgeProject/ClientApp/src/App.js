import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

//import Login from "./components/Login";
import Register from "./components/Register";
//import Profile from "./components/Profile";
import { Home } from "./components/Home";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './utils/history';
import EventBus from "./common/EventBus";

class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        history.listen((location) => {
            props.dispatch(clearMessage());
        });
    }

    componentDidMount() {
        EventBus.on("logout", () => {
            this.props.dispatch(logout());
        });
    }
    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut = (e) => {
        e.preventDefault();
        this.props.dispatch(logout());
    }

    render() {
        return (
            <Router history={history}>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <Link to={"/"} className="navbar-brand">
                            FridgeProject
                        </Link>
                        {this.props.user ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={this.logOut}>
                                        LogOut
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <Fragment>
                                <div className="navbar-nav mr-auto">
                                    <li className="nav-item">
                                        <Link to={"/home"} className="nav-link">
                                            Home
                                        </Link>
                                    </li>
                                </div>
                                <div className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <Link to={"/login"} className="nav-link">
                                            Login
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to={"/register"} className="nav-link">
                                            Sign Up
                                        </Link>
                                    </li>
                                </div>
                            </Fragment>
                        )}
                    </nav>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/home"]} component={Home} />
                            {/*<Route exact path="/login" component={Login} />*/}
                            <Route exact path="/register" component={Register} />
                            {/*<Route exact path="/profile" component={Profile} />*/}
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user,
    };
}

export default connect(mapStateToProps)(App);
