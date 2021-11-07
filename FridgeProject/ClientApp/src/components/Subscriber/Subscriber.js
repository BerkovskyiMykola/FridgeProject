import React from 'react'
import { Container, Button, Row, Col } from 'reactstrap';
import SubscriberList from './SubscriberList/SubscriberList';

const Subscriber = () => {
    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>Subscribers of fridge</h3></Col>
                    <Col className="text-right"><Button color="success">New Subscriber</Button></Col>
                </Row>
            </Container>
            <SubscriberList subscribers={[{ email: "f1", firstname: "f2", lastname: "f3"}]}/>
        </Container>
    );
};

export default Subscriber;