import React from 'react'
import { Container, Row, Col } from "reactstrap";
import FridgeItem from '../FridgeItem/FridgeItem';

const FridgeList = ({ fridges, deleteFridge, editFridge }) => {

    if (fridges.length === 0) {
        return (
            <Container style={{ backgroundColor: "#F2F2F2" }}>
                <Row className="text-center">
                    <Col className="col-12 my-5"><h2>Fridge list is empty</h2></Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container style={{ backgroundColor: "#F2F2F2" }}>
            <Row>
                {fridges.map((fridge) => <FridgeItem editFridge={editFridge} deleteFridge={deleteFridge} key={fridge.fridgeId} {...fridge}/> )}
            </Row>
        </Container>
    );
};

export default FridgeList;