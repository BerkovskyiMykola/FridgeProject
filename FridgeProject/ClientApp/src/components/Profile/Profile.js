import React from "react";

import { shallowEqual, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function Profile(props) {
    const { user } = useSelector(state => ({
        user: state.auth.user
    }), shallowEqual)

    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{user.email}</strong> Profile
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {user.token.substring(0, 20)} ...{" "}
                {user.token.substr(user.token.length - 20)}
            </p>
            <p>
                <strong>Id:</strong> {user.userId}
            </p>
            <p>
                <strong>Email:</strong> {user.email}
            </p>
            <p>
                <strong>Role:</strong> {user.role}
            </p>
        </div>
    );
}