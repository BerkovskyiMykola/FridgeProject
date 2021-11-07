import React, { useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import { createFridge } from '../../../actions/fridge';
import { clearMessage } from '../../../actions/message';
import { validateField, validateRequired } from '../../../validation/validation';
import { Field, Form } from '../../FormComponents';


const AddModalWindow = ({ modalAdd, deactiveModalAdd }) => {
    const dispatch = useDispatch();

    const { message, userId } = useSelector(state => ({
        message: state.message.message,
        userId: state.auth.user.userId
    }), shallowEqual)

    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);
    const [fridgeName, setFridgeName] = useState("");

    const handleCreate = (e) => {
        e.preventDefault();

        form.validateAll();

        if (checkBtn.context._errors.length === 0) {
            dispatch(createFridge(fridgeName, userId))
                .then(() => {
                    deactiveModalAdd();
                    dispatch(clearMessage());
                    setFridgeName("");
                })
                .catch(() => {})
        }

    }

    return (
        <Modal isOpen={modalAdd} toggle={deactiveModalAdd}>
            <ModalHeader toggle={deactiveModalAdd} >Add Fridge</ModalHeader>
            <ModalBody>
                <Form handleSubmit={handleCreate} setForm={(c) => { setForm(c); }}
                    message={message} setCheckBtn={(c) => { setCheckBtn(c); }}>
                    <Field title="Fridge name" name="fridgename" value={fridgeName}
                        setValue={(e) => { setFridgeName(e.target.value) }} validations={[validateRequired, validateField]} />

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Create</button>
                    </div>
                </Form>
            </ModalBody>
        </Modal>
    );
}

export default AddModalWindow;