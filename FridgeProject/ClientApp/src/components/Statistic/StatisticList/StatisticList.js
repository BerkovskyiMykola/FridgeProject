import React from 'react'
import { Container, Row, Col } from "reactstrap";
import StatisticItem from '../StatisticItem/StatisticItem';

const StatisticList = ({ statistic }) => {

    if (statistic.length === 0) {
        return (
            <Container style={{ backgroundColor: "#F2F2F2" }}>
                <Row className="text-center">
                    <Col className="col-12 my-5"><h2>Statistic list is empty</h2></Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container style={{ backgroundColor: "#F2F2F2" }}>
            <Row>
                {statistic.map((statisticItem) => <StatisticItem key={statisticItem.productName} {...statisticItem} />)}
            </Row>
        </Container>
    );
};

export default StatisticList;