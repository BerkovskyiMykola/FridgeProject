import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { editUser, getUser } from "../../actions/user";
import profileImg from "../../img/avatar.png"
import { validateField, validateRequired } from "../../validation/validation";
import { Field, Form } from "../FormComponents";

export default function Profile(props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { message, user, lastName, firstName } = useSelector(state => ({
        message: state.message.message,
        user: state.auth.user,
        lastName: state.user.lastname,
        firstName: state.user.firstname,
    }), shallowEqual)

    useEffect(() => {
        dispatch(getUser())
            .then((r) => {
                setLastname(lastName); setFirstname(firstName); })
            .catch(() => { props.history.push("/404") });
    }, [dispatch, props.history, lastName, firstName])

    const [lastname, setLastname] = useState("");
    const [firstname, setFirstname] = useState("");
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

    const handleEdit = (e) => {
        e.preventDefault();

        form.validateAll();

        if (checkBtn.context._errors.length === 0) {
            dispatch(
                editUser(user.userId, lastname, firstname)
            )
                .then(() => { props.history.push("/fridges") })
                .catch(() => { });
        }

    }

    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img
                    src={profileImg}
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form handleSubmit={handleEdit} setForm={(c) => { setForm(c); }}
                    message={message} setCheckBtn={(c) => { setCheckBtn(c); }} >
                    <div>
                        <Field title={<Trans>{t("Firsname")}</Trans>} name="firstname" value={firstname}
                            setValue={(e) => { setFirstname(e.target.value) }} validations={[validateRequired, validateField]} />
                        <Field title={<Trans>{t("Lastname")}</Trans>} name="lastname" value={lastname}
                            setValue={(e) => { setLastname(e.target.value) }} validations={[validateRequired, validateField]} />

                        <div className="form-group">
                            <button className="btn btn-primary btn-block"><Trans>{t("Edit")}</Trans></button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}