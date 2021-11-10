import React, { Fragment } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import { Home } from "./components/Home";
import NotFound from "./components/NotFound";
import Fridge from "./components/Fridge/Fridge"

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './utils/history';
import EventBus from "./common/EventBus";
import { useEffect } from "react";import Subscriber from "./components/Subscriber/Subscriber";
import Product from "./components/Product/Product";
import Notification from "./components/Notification/Notification";
import History from "./components/History/History";

export default function App() {
    const dispatch = useDispatch();

    const { user } = useSelector(state => ({
        user: state.auth.user,
    }), shallowEqual)

    history.listen((location) => {
        dispatch(clearMessage());
    });

    useEffect(() => {
        EventBus.on("logout", () => {
            dispatch(logout());
        });

        return () => { EventBus.remove("logout"); }
    }, [dispatch])

    const logOut = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <Router history={history}>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        FridgeProject
                    </Link>
                    {user ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/fridges"} className="nav-link">
                                    Fridges
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/notifications"} className="nav-link">
                                    Notifications
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/histories"} className="nav-link">
                                    Histories
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={logOut}>
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
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/fridges" component={Fridge} />
                        <Route exact path="/histories" component={History} />
                        <Route exact path="/notifications" component={Notification} />
                        <Route exact path="/subscribers/:fridgeId" component={Subscriber} />
                        <Route exact path="/products/:fridgeId" component={Product} />
                        <Route exact path="/404"component={NotFound} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}
