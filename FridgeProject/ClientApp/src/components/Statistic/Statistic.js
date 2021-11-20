import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Button } from "reactstrap";
import { Redirect } from 'react-router-dom';
import { getProductStatistic } from '../../actions/statistic';
import { Field } from '../FormComponents';
import StatisticList from './StatisticList/StatisticList';
import { clearMessage } from '../../actions/message';
import ModalWindow from '../ModalWindow/ModalWindow';
import {  useTranslation } from 'react-i18next';

const Statistic = (props) => {
    const { t } = useTranslation();
    const [startDate, setStartDate] = useState(new Date().toISOString().substring(0, 10));
    const [endDate, setEndDate] = useState(new Date().toISOString().substring(0, 10));
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);

    const dispatch = useDispatch();

    const { user, statistic, message } = useSelector(state => ({
        statistic: state.statistic.statistic,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    const clearFields = () => {
        dispatch(clearMessage());
        setStartDate(new Date().toISOString().substring(0, 10));
        setEndDate(new Date().toISOString().substring(0, 10));
    }

    const getStatistic = () => {
        dispatch(getProductStatistic(startDate, endDate))
            .then(() => {
                setModal(false);
                clearFields();
            })
            .catch(() => { })
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
                    <Col className="text-left"><h3>{t("Statistic")}</h3></Col>
                    <Col className="text-right">
                        <Button color="success"
                            onClick={() => { setModal(true); clearFields(); }}
                        >
                            {t("GetStatistic")}
                        </Button>
                    </Col>
                </Row>
            </Container>
            <StatisticList statistic={statistic} />
            <ModalWindow modal={modal} deactiveModal={() => setModal(false)} textHeader={t("Statistic")}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton={t("Get")} method={getStatistic} form={form} message={message}
            >
                <Field title={t("StartDate")} name="startDate" value={startDate} type="date"
                    setValue={(e) => { setStartDate(e.target.value) }} />
                <Field title={t("EndDate")} name="endDate" value={endDate} type="date"
                    setValue={(e) => { setEndDate(e.target.value) }} />
            </ModalWindow>
        </Container>
    );
};

export default Statistic;