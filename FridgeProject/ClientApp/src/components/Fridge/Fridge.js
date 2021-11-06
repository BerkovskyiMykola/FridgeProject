import React from 'react'
import { Container, Row, Button, Col } from "reactstrap";
import FridgeList from './FridgeList/FridgeList';

const Fridge = (props) => {

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>Fridge</h3></Col>
                    <Col className="text-right"><Button color="success">New Fridge</Button></Col>
                </Row>
            </Container>
            <FridgeList />
        </Container>
    );
};

export default Fridge;