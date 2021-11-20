import React from 'react'
import {  useTranslation } from 'react-i18next';
import { Container, Row, Col } from "reactstrap";
import HistoryItem from '../HistoryItem/HistoryItem';

const HistoryList = ({ histories, deleteHistory }) => {
    const { t } = useTranslation();

    if (histories.length === 0) {
        return (
            <Container style={{ backgroundColor: "#F2F2F2" }}>
                <Row className="text-center">
                    <Col className="col-12 my-5"><h2>{t("ListEmpty")}</h2></Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container style={{ backgroundColor: "#F2F2F2" }}>
            <Row>
                {histories.map((history) => <HistoryItem
                    deleteHistory={deleteHistory} key={history.historyId} {...history} />)}
            </Row>
        </Container>
    );
};

export default HistoryList;