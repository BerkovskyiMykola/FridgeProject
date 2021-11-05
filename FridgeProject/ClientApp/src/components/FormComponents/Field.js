import React from 'react';
import Input from "react-validation/build/input";

const Field = ({ title, name, value, setValue, validations }) => {

    return (
        <div className="form-group">
            <label htmlFor={name}>{title}</label>
            <Input
                type="text"
                className="form-control"
                name={name}
                value={value}
                onChange={setValue}
                validations={validations}
            />
        </div>
    );
}

export default Field;