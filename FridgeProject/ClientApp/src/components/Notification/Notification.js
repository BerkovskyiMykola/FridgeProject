import React, { useEffect, useState } from 'react'
import * as SignalR from '@aspnet/signalr';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, CardText, CardTitle } from "reactstrap";
import { allNotifications } from '../../actions/notification';
import { Redirect } from 'react-router-dom';

const Notification = () => {
    const [arrivedNotifications, setArrivedNotifications] = useState([]);
    const dispatch = useDispatch();

    const { user, notifications } = useSelector(state => ({
        notifications: state.notification.notifications,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(allNotifications());

        const user = JSON.parse(sessionStorage.getItem("user"));

        const connection = new SignalR.HubConnectionBuilder()
            .withUrl('https://localhost:44353/hubs/notification', { accessTokenFactory: () => user.token })
            .build();

        connection.on('Notify', (notification) => {
            setArrivedNotifications([notification, ...arrivedNotifications]);
            console.log(notification.text);
        });

        connection.start()
            .then(() => { console.log("SignalR connected success"); })
            .catch((error) => console.log("SignalR connection error: " + error));
        return () => { connection.stop(); }
    }, [dispatch, arrivedNotifications])

    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <Container style={{ backgroundColor: "#F2F2F2" }}>
            <Row>
                {arrivedNotifications.map((item) =>
                    <Col key= { item.notificationId } sm="4">
                        <Card body>
                            <CardTitle className="text-center" tag="h5">
                                {new Date(item.date).toLocaleDateString()}
                            </CardTitle>
                            <CardText>
                                {item.text}
                            </CardText>
                        </Card>
                    </Col>
                )}
                {notifications.map((item) =>
                    <Col key={item.notificationId} sm="4">
                        <Card body>
                            <CardTitle className="text-center" tag="h5">
                                {new Date(item.date).toLocaleDateString()}
                            </CardTitle>
                            <CardText>
                                {item.text}
                            </CardText>
                        </Card>
                    </Col>
                )}
            </Row>
        </Container>
    );
}

export default Notification;
