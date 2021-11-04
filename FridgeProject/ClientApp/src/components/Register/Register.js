import React, { useState } from "react";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";

import profileImg from "../../img/avatar.png"
import { validateRequired, validateEmail, validateField, validatePassword } from "../../validation/validation";

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

    const dispatch = useDispatch();

    const { message } = useSelector(state => ({
        message: state.message.message
    }), shallowEqual)

    const handleRegister = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.validateAll();

        const USER_ROLE = 'User';

        if (checkBtn.context._errors.length === 0) {
            dispatch(
                register(lastName, firstName, email, password, USER_ROLE)
            )
            .then(() => { setSuccessful(true); })
            .catch(() => { setSuccessful(false); });
        }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src={profileImg}
                    alt="profile-img"
                    className="profile-img-card"
                />

                <Form
                    onSubmit={handleRegister}
                    ref={(c) => {
                        setForm(c);
                    }}
                >
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    validations={[validateRequired, validateEmail]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="firstname">First name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="firstname"
                                    value={firstName}
                                    onChange={(e) => { setFirstName(e.target.value) }}
                                    validations={[validateRequired, validateField]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="lastname">Last name</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                    value={lastName}
                                    onChange={(e) => { setLastName(e.target.value) }}
                                    validations={[validateRequired, validateField]}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    validations={[validateRequired, validatePassword]}
                                />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Sign Up</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton
                        style={{ display: "none" }}
                        ref={(c) => {
                            setCheckBtn(c);
                        }}
                    />
                </Form>
            </div>
        </div>
    );
}