import React, { useEffect, useState } from 'react'
import * as SignalR from '@aspnet/signalr';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

const Notifications = () => {
    const [arrivedNotifications, setArrivedNotifications] = useState([]);
    const dispatch = useDispatch();

    const { user, notifications } = useSelector(state => ({
        notifications: state.notification.notifications,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
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
    }, [dispatch])

    return (
        <div>
            
        </div>
    );
}

export default Notifications;
