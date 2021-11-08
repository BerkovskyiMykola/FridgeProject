import React from 'react'
import { Table, Container, Row, Col } from "reactstrap";
import SubscriberItem from '../SubscriberItem/SubscriberItem';

const SubscriberList = ({ subscribers, deleteSubscriber }) => {
    if(subscribers.length === 0) {
        return (
            <Container style={{ backgroundColor: "#F2F2F2" }}>
                <Row className="text-center">
                    <Col className="col-12 my-5"><h2>Subscriber list is empty</h2></Col>
                </Row>
            </Container>
        );
    }

    return (
        <Table dark>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Full name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {subscribers.map((item, index) => (<SubscriberItem deleteSubscriber={deleteSubscriber} key={item.subscriberId} item={item} index={index} />))}
            </tbody>
        </Table>
    );
};

export default SubscriberList;