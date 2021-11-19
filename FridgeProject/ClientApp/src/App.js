import React, { Fragment, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Fridge from "./components/Fridge/Fridge"
import Subscriber from "./components/Subscriber/Subscriber";
import Product from "./components/Product/Product";
import Notification from "./components/Notification/Notification";
import History from "./components/History/History";
import Statistic from "./components/Statistic/Statistic";
import User from "./components/Admin/User";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './utils/history';
import EventBus from "./common/EventBus";
import { Trans, useTranslation } from "react-i18next";

export default function App() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const { user } = useSelector(state => ({
        user: state.auth.user,
    }), shallowEqual)

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage());
        });

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
                            <><div className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <button onClick={() => { i18n.changeLanguage("en"); } }>en</button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => { i18n.changeLanguage("ua"); } }>ua</button>
                                </li>
                            </div>
                            <div className="navbar-nav ml-auto">
                                {user.role === "Admin" ? (
                                    <><li className="nav-item">
                                        <Link to={"/users"} className="nav-link">
                                            <Trans>{t("Users")}</Trans>
                                        </Link>
                                    </li>
                                        <li className="nav-item">
                                            <Link to={"/profile"} className="nav-link">
                                                <Trans>{t("Profile")}</Trans>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/login" className="nav-link" onClick={logOut}>
                                                <Trans>{t("LogOut")}</Trans>
                                            </a>
                                        </li>
                                    </>
                                ) : (<>
                                    <li className="nav-item">
                                        <Link to={"/fridges"} className="nav-link">
                                            <Trans>{t("Fridges")}</Trans>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link">
                                            <Trans>{t("Profile")}</Trans>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/notifications"} className="nav-link">
                                            <Trans>{t("Notifications")}</Trans>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/histories"} className="nav-link">
                                            <Trans>{t("Histories")}</Trans>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={"/statistic"} className="nav-link">
                                            <Trans>{t("Statistic")}</Trans>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link" onClick={logOut}>
                                            <Trans>{t("LogOut")}</Trans>
                                        </a>
                                    </li>
                                </>)}
                            </div></>
                    ) : (
                        <Fragment>
                            <div className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={"/home"} className="nav-link">
                                        <Trans>{t("Home")}</Trans>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => { i18n.changeLanguage("en") }}>en</button>
                                </li>
                                <li className="nav-item">
                                    <button onClick={() => { i18n.changeLanguage("ua") }}>ua</button>
                                </li>
                            </div>
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        <Trans>{t("Login")}</Trans>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        <Trans>{t("Sign Up")}</Trans>
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
                        <Route exact path="/statistic" component={Statistic} />
                        <Route exact path="/users" component={User} />
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
