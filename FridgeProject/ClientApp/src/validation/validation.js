import React from "react";
import { isEmail, isMobilePhone } from "validator";

export const validateRequired = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

export const validatePhone = (value) => {
    if (!isMobilePhone(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Phone is invalid!
            </div>
        );
    }
};

export const validateEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email. Example: example@example.com
            </div>
        );
    }
};

export const validateField = (value) => {
    if (value.length > 24) {
        return (
            <div className="alert alert-danger" role="alert">
                The field must be between 1 and 24 characters.
            </div>
        );
    }
};

export const validatePassword = (value) => {
    if (value.length < 8 || value.length > 16) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 8 and 16 characters.
            </div>
        );
    }
};

export const validateLength30 = (value) => {
    if (value.length > 30) {
        return (
            <div className="alert alert-danger" role="alert">
                The field max length is 30.
            </div>
        );
    }
};

export const validateLength256 = (value) => {
    if (value.length > 256) {
        return (
            <div className="alert alert-danger" role="alert">
                The field max length is 256.
            </div>
        );
    }
};

export const validateRangeFromZeroToOne = (value) => {
    if (value < 0 || value > 1) {
        return (
            <div className="alert alert-danger" role="alert">
                The Range is must be between 0 and 1.
            </div>
        );
    }
};