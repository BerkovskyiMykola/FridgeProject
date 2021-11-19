import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { createFridge, deleteFridge, editFridge, getOwnFridges, getSharedFridges } from '../../actions/fridge';
import { clearMessage } from '../../actions/message';
import { validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import FridgeList from './FridgeList/FridgeList';
import ModalWindow from '../ModalWindow/ModalWindow';
import { Redirect } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';

const Fridge = (props) => {
    const { t } = useTranslation();
    const [selectedTab, setSelectedTab] = useState("1");
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);
    const [fridgeName, setFridgeName] = useState("");
    const [fridgeId, setFridgeId] = useState(0);

    const dispatch = useDispatch();

    const { ownFridges, sharedFridges, message, user  } = useSelector(state => ({
        ownFridges: state.fridge.ownFridges,
        sharedFridges: state.fridge.sharedFridges,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getOwnFridges());
        dispatch(getSharedFridges())
    }, [dispatch])

    const createRecord = () => {
        dispatch(createFridge(fridgeName, user.userId))
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

    if (!user) {
        return <Redirect to="/login" />;
    }

    if (user.role === "Admin") {
        return <Redirect to="/users" />;
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3><Trans>{t("Fridges")}</Trans></h3></Col>
                    <Col className="text-right">
                        <Button disabled={selectedTab === "2"} color="success"
                            onClick={() => { setFridgeName(""); setFridgeId(0); dispatch(clearMessage()); setModalAdd(true); }}>
                            <Trans>{t("NewFridge")}</Trans>
                        </Button>
                        <Button onClick={() => {
                            dispatch(getOwnFridges());
                            dispatch(getSharedFridges())
                        }}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Nav fill tabs>
                <NavItem>
                    <NavLink
                        className={selectedTab==="1" ? "active" : ""}
                        onClick={() => { setSelectedTab("1"); }}
                    >
                        <Trans>{t("Own")}</Trans>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={selectedTab === "2" ? "active" : ""}
                        onClick={() => { setSelectedTab("2"); }}
                    >
                        <Trans>{t("Shared")}</Trans>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={selectedTab}>
                <TabPane tabId="1">
                    <FridgeList history={props.history} fridges={ownFridges} deleteFridge={deleteRecord} editFridge={getFridgeValues} isOwnFridge/>
                </TabPane>
                <TabPane tabId="2">
                    <FridgeList history={props.history} fridges={sharedFridges} isOwnFridge={false}/>
                </TabPane>
            </TabContent>
            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={<Trans>{t("AddFridge")}</Trans>}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton={<Trans>{t("Create")}</Trans>} method={createRecord} form={form} message={message}
            >
                <Field title={<Trans>{t("FridgeName")}</Trans>} name="fridgename" value={fridgeName}
                    setValue={(e) => { setFridgeName(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={<Trans>{t("EditFridge")}</Trans>}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                method={editRecord} message={message} form={form} textButton={<Trans>{t("Edit")}</Trans>}
            >
                <Field title={<Trans>{t("FridgeName")}</Trans>} name="fridgename" value={fridgeName}
                    setValue={(e) => { setFridgeName(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
            </ModalWindow>
        </Container>
    );
};

export default Fridge;