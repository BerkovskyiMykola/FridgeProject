import React from 'react'
import {  useTranslation } from 'react-i18next';
import { Table, Container, Row, Col } from "reactstrap";
import SubscriberItem from '../SubscriberItem/SubscriberItem';

const SubscriberList = ({ subscribers, deleteSubscriber }) => {
    const { t } = useTranslation();

    if(subscribers.length === 0) {
        return (
            <Container style={{ backgroundColor: "#F2F2F2" }}>
                <Row className="text-center">
                    <Col className="col-12 my-5"><h2>{t("ListEmpty")}</h2></Col>
                </Row>
            </Container>
        );
    }

    return (
        <Table dark>
            <thead>
                <tr>
                    <th>#</th>
                    <th>{t("Email")}</th>
                    <th>{t("Fullname")}</th>
                    <th>{t("functions")}</th>
                </tr>
            </thead>
            <tbody>
                {subscribers.map((item, index) => (<SubscriberItem deleteSubscriber={deleteSubscriber} key={item.subscriberId} item={item} index={index} />))}
            </tbody>
        </Table>
    );
};

export default SubscriberList;