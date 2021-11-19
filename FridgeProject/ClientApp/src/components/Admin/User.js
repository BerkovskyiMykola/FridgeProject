﻿import React, { useEffect, useState } from 'react'
import Select from "react-validation/build/select";
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col } from "reactstrap";
import { validateEmail, validateField, validatePassword, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Redirect } from 'react-router-dom';
import { createUser, deleteUser, editUser, getUsers } from '../../actions/admin';
import UserList from './UserList/UserList';
import { clearMessage } from '../../actions/message';
import datebaseService from '../../services/datebase.service';

const User = (props) => {
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [userId, setUserId] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("User");
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

    const dispatch = useDispatch();

    const { users, message, user } = useSelector(state => ({
        users: state.admin.users,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch])

    const createRecord = () => {
        dispatch(createUser(lastName, firstName, email, password, role))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setRole("User");
        setUserId(0);
    }

    const editRecord = () => {
        dispatch(editUser(userId, lastName, firstName, role))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const deleteRecord = (id) => {
        dispatch(deleteUser(id))
            .then(() => { })
            .catch(() => { })
    }

    const getUserValues = (firstname, lastname, email, role, userId) => {
        setFirstName(firstname);
        setLastName(lastname);
        setEmail(email);
        setRole(role);
        setUserId(userId);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const createBackup = () => {
        datebaseService.backup().then(() => { alert("Success") }).catch(() => { alert("Error") });
    }

    const restoreDatabase = () => {
        datebaseService.restore().then(() => { alert("Success") }).catch(() => { alert("Error") });
    }

    if (!user) {
        return <Redirect to="/login" />;
    }
    if (user.role === "User") {
        return <Redirect to="/fridges" />;
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>Users</h3></Col>
                    <Col className="text-right">
                        <Button onClick={createBackup} color="info">Create backup</Button>
                        <Button onClick={restoreDatabase} color="warning">Restore database</Button>
                        <Button onClick={() => setModalAdd(true)} color="success">+ New User</Button>
                        <Button onClick={() => {
                            dispatch(getUsers());
                        }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>
            <UserList users={users} deleteUser={deleteRecord} editUser={getUserValues}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader="Add User"
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton="Create" method={createRecord} form={form} message={message}
            >
                <Field title="Email" name="email" value={email}
                    setValue={(e) => { setEmail(e.target.value) }} validations={[validateRequired, validateEmail]} />
                <Field title="First name" name="firstname" value={firstName}
                    setValue={(e) => { setFirstName(e.target.value) }} validations={[validateRequired, validateField]} />
                <Field title="Last name" name="lastname" value={lastName}
                    setValue={(e) => { setLastName(e.target.value) }} validations={[validateRequired, validateField]} />
                <Field title="Password" name="password" value={password}
                    setValue={(e) => { setPassword(e.target.value) }} validations={[validateRequired, validatePassword]} />
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <Select className="form-control" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value='User'>User</option>
                        <option value='Admin'>Admin</option>
                    </Select>
                </div>
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader="Edit User"
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                method={editRecord} message={message} form={form} textButton="Edit"
            >
                <p>Email: {email}</p>
                <Field title="First name" name="firstname" value={firstName}
                    setValue={(e) => { setFirstName(e.target.value) }} validations={[validateRequired, validateField]} />
                <Field title="Last name" name="lastname" value={lastName}
                    setValue={(e) => { setLastName(e.target.value) }} validations={[validateRequired, validateField]} />
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <Select className="form-control" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value='User'>User</option>
                        <option value='Admin'>Admin</option>
                    </Select>
                </div>
            </ModalWindow>
        </Container>
    );
};

export default User;