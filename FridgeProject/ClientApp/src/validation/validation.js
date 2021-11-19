import React from "react";
import { Trans } from "react-i18next";
import { isEmail } from "validator";

export const validateRequired = (t) => (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                <Trans>{t("This field is required!")}</Trans>
            </div>
        );
    }
};

export const validateEmail = (t) => (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                <Trans>{t("This is not a valid email. Example: example@example.com")}</Trans>
            </div>
        );
    }
};

export const validateField = (t) => (value) => {
    if (value.length > 30 || value.length < 2) {
        return (
            <div className="alert alert-danger" role="alert">
                <Trans>{t("The field must be between 2 and 30 characters.")}</Trans>
            </div>
        );
    }
};

export const validateDescription = (t) => (value) => {
    if (value.length > 50 || value.length < 2) {
        return (
            <div className="alert alert-danger" role="alert">
                <Trans>{t("The field must be between 2 and 50 characters.")}</Trans>
            </div>
        );
    }
};

export const validatePassword = (t) => (value) => {
    if (value.length < 8 || value.length > 18) {
        return (
            <div className="alert alert-danger" role="alert">
                <Trans>{t("The password must be between 8 and 18 characters.")}</Trans>
            </div>
        );
    }
};