﻿import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { createFridge, deleteFridge, editFridge, getOwnFridges, getSharedFridges } from '../../actions/fridge';
import { clearMessage } from '../../actions/message';
import { validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import FridgeList from './FridgeList/FridgeList';
import ModalWindow from '../ModalWindow/ModalWindow';

const Fridge = (props) => {
    const [selectedTab, setSelectedTab] = useState("1");
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);
    const [fridgeName, setFridgeName] = useState("");
    const [fridgeId, setFridgeId] = useState(0);

    const dispatch = useDispatch();

    const { ownFridges, sharedFridges, message, userId  } = useSelector(state => ({
        ownFridges: state.fridge.ownFridges,
        sharedFridges: state.fridge.sharedFridges,
        message: state.message.message,
        userId: state.auth.user.userId
    }), shallowEqual)

    useEffect(() => {
        dispatch(getOwnFridges());
        dispatch(getSharedFridges())
    }, [dispatch])

    const createRecord = () => {
        dispatch(createFridge(fridgeName, userId))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                setFridgeName("");
            })
            .catch(() => { })
    }

    const editRecord = () => {
        dispatch(editFridge(fridgeId, fridgeName))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                setFridgeName("");
                setFridgeId(0);
            })
            .catch(() => { })
    }

    const deleteRecord = (fridgeId) => {
        dispatch(deleteFridge(fridgeId))
            .then(() => { })
            .catch(() => { })
    }

    const getFridgeValues = (fridgeId, fridgeName) => {
        setFridgeName(fridgeName);
        setFridgeId(fridgeId);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>Fridges</h3></Col>
                    <Col className="text-right"><Button disabled={selectedTab === "2"} color="success" onClick={() => { setFridgeName(""); setFridgeId(0); dispatch(clearMessage()); setModalAdd(true);  }}>New Fridge</Button></Col>
                </Row>
            </Container>
            <Nav fill tabs>
                <NavItem>
                    <NavLink
                        className={selectedTab==="1" ? "active" : ""}
                        onClick={() => { setSelectedTab("1"); }}
                    >
                        Own
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={selectedTab === "2" ? "active" : ""}
                        onClick={() => { setSelectedTab("2"); }}
                    >
                        Shared
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={selectedTab}>
                <TabPane tabId="1">
                    <FridgeList fridges={ownFridges} deleteFridge={deleteRecord} editFridge={getFridgeValues}/>
                </TabPane>
                <TabPane tabId="2">
                    <FridgeList fridges={sharedFridges}/>
                </TabPane>
            </TabContent>
            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader="Add Fridge"
                message={message} form={form} setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }} textButton="Create"
                method={createRecord}
            >
                <Field title="Fridge name" name="fridgename" value={fridgeName}
                    setValue={(e) => { setFridgeName(e.target.value) }} validations={[validateRequired, validateField]} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader="Edit Fridge"
                message={message} form={form} setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }} textButton="Edit"
                method={editRecord}
            >
                <Field title="Fridge name" name="fridgename" value={fridgeName}
                    setValue={(e) => { setFridgeName(e.target.value) }} validations={[validateRequired, validateField]} />
            </ModalWindow>
        </Container>
    );
};

export default Fridge;