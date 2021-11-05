import React, { useState } from "react";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/auth";

import profileImg from "../../img/avatar.png"
import { validateRequired, validateEmail, validateField, validatePassword } from "../../validation/validation";
import { Field, Form } from "../FormComponents";

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
                <Form handleRegister={handleRegister} setForm={(c) => { setForm(c); }}
                    successful={successful} message={message} setCheckBtn={(c) => { setCheckBtn(c); }} >
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