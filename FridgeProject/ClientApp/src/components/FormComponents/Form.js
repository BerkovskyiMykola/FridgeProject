import React from 'react';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

const FormComponent = ({ setForm, handleSubmit, children, message, setCheckBtn }) => {

    return (
        <Form
            onSubmit={handleSubmit}
            ref={setForm}
        >
            {children}
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
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
    );
}

export default FormComponent;