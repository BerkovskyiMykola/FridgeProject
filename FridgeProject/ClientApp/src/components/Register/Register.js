﻿import React, { useState } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../../actions/auth";

import profileImg from "../../img/avatar.png"
import { validateRequired, validateEmail, validateField, validatePassword } from "../../validation/validation";
import { Field, Form } from "../FormComponents";

export default function Register(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

    const dispatch = useDispatch();

    const { message, isLoggedIn } = useSelector(state => ({
        message: state.message.message,
        isLoggedIn: state.auth.isLoggedIn
    }), shallowEqual)

    const handleRegister = (e) => {
        e.preventDefault();

        form.validateAll();

        const USER_ROLE = 'User';

        if (checkBtn.context._errors.length === 0) {
            dispatch(
                register(lastName, firstName, email, password, USER_ROLE)
            )
            .then(() => {  })
            .catch(() => {  });
        }

    }

    if (isLoggedIn) {
        return <Redirect to="/fridges" />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src={profileImg}
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form handleSubmit={handleRegister} setForm={(c) => { setForm(c); }}
                    message={message} setCheckBtn={(c) => { setCheckBtn(c); }} >
                    <div>
                        <Field title="Email" name="email" value={email}
                            setValue={(e) => { setEmail(e.target.value) }} validations={[validateRequired, validateEmail]} />
                        <Field title="First name" name="firstname" value={firstName}
                            setValue={(e) => { setFirstName(e.target.value) }} validations={[validateRequired, validateField]} />
                        <Field title="Last name" name="lastname" value={lastName}
                            setValue={(e) => { setLastName(e.target.value) }} validations={[validateRequired, validateField]} />
                        <Field title="Password" name="password" value={password}
                            setValue={(e) => { setPassword(e.target.value) }} validations={[validateRequired, validatePassword]} />

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Sign Up</button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}