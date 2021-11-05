import React, { useState } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../actions/auth";

import profileImg from "../../img/avatar.png"
import { validateRequired, validateEmail, validatePassword } from "../../validation/validation";
import { Field, Form } from "../FormComponents";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

    const dispatch = useDispatch();

    const { message, isLoggedIn } = useSelector(state => ({
        message: state.message.message,
        isLoggedIn: state.auth.isLoggedIn
    }), shallowEqual)

    const handleLogin = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.validateAll();

        if (checkBtn.context._errors.length === 0) {
            dispatch(login(email, password))
                .then(() => {
                    props.history.push("/refrigerators");
                })
                .catch(() => {
                    setSuccessful(false);
                });
        } else {
            setSuccessful(false);
        }
    }

    if (isLoggedIn) {
        return <Redirect to="/profile" />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src={profileImg}
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form handleSubmit={handleLogin} setForm={(c) => { setForm(c); }}
                    successful={successful} message={message} setCheckBtn={(c) => { setCheckBtn(c); }} >
                    <div>
                        <Field title="Email" name="email" value={email}
                            setValue={(e) => { setEmail(e.target.value) }} validations={[validateRequired, validateEmail]} />
                        <Field title="Password" name="password" value={password}
                            setValue={(e) => { setPassword(e.target.value) }} validations={[validateRequired, validatePassword]} />

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Login</button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}