import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Button, Row, Col } from 'reactstrap';
import { clearMessage } from '../../actions/message';
import { createSubscriber, deleteSubscriber, getSubscribers } from '../../actions/subscriber';
import { validateEmail, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import SubscriberList from './SubscriberList/SubscriberList';

const Subscriber = (props) => {
    const fridgeId = props.match.params.fridgeId;

    const dispatch = useDispatch();

    const { subscribers, message, user, fridgeName } = useSelector(state => ({
        subscribers: state.subscriber.subscribers,
        fridgeName: state.subscriber.fridgeName,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getSubscribers(fridgeId, fridgeName))
            .then(() => { })
            .catch(() => { props.history.push("/404")});
    }, [dispatch, fridgeName, fridgeId, props.history])

    const [modalAdd, setModalAdd] = useState(false);
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);
    const [email, setEmail] = useState("");

    const createRecord = () => {
        dispatch(createSubscriber(email, fridgeId))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                setEmail("");
            })
            .catch(() => { })
    }

    const deleteRecord = (id) => {
        dispatch(deleteSubscriber(id))
            .then(() => { })
            .catch(() => { })
    }

    if (!user) {
        return <Redirect to="/login" />;
    }

    if (user.role == "Admin") {
        return <Redirect to="/users" />;
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>Subscribers of {fridgeName}</h3></Col>
                    <Col className="text-right"><Button
                        onClick={() => { setEmail(""); dispatch(clearMessage()); setModalAdd(true); }}
                        color="success">New Subscriber</Button></Col>
                </Row>
            </Container>
            <SubscriberList deleteSubscriber={deleteRecord} subscribers={subscribers} />
            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader="Add Subscriber"
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton="Create" method={createRecord} form={form} message={message}
            >
                <Field title="Email" name="email" value={email}
                    setValue={(e) => { setEmail(e.target.value) }} validations={[validateRequired, validateEmail]} />
            </ModalWindow>
        </Container>
    );
};

export default Subscriber;