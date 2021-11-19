import React from 'react'
import { Trans, useTranslation } from 'react-i18next';
import { Container, Row, Col } from "reactstrap";
import FridgeItem from '../FridgeItem/FridgeItem';

const FridgeList = ({ fridges, deleteFridge, editFridge, isOwnFridge, history }) => {
    const { t } = useTranslation();

    if (fridges.length === 0) {
        return (
            <Container style={{ backgroundColor: "#F2F2F2" }}>
                <Row className="text-center">
                    <Col className="col-12 my-5"><h2><Trans>{t("ListEmpty")}</Trans></h2></Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container style={{ backgroundColor: "#F2F2F2" }}>
            <Row>
                {fridges.map((fridge) => <FridgeItem history={history}
                    isOwnFridge={isOwnFridge} editFridge={editFridge}
                    deleteFridge={deleteFridge} key={fridge.fridgeId} {...fridge} />)}
            </Row>
        </Container>
    );
};

export default FridgeList;