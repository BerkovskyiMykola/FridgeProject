import React from 'react'
import { Container, Row } from "reactstrap";
import FridgeItem from '../FridgeItem/FridgeItem';

const FridgeList = (props) => {

    return (
        <Container style={{ backgroundColor: "#F2F2F2" }}>
            <Row>
                <FridgeItem />
                <FridgeItem />
                <FridgeItem />
                <FridgeItem />
                <FridgeItem />
                <FridgeItem />
                <FridgeItem />
                <FridgeItem />
            </Row>
        </Container>
    );
};

export default FridgeList;