import React from 'react';
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

const FormComponent = ({ setForm, handleRegister, successful, children, message, setCheckBtn }) => {

    return (
        <Form
            onSubmit={handleRegister}
            ref={setForm}
        >
            {!successful && (
                children
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
    );
}

export default FormComponent;