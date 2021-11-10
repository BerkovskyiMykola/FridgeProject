import React from 'react';
import { CardTitle, Card, Col, CardText} from "reactstrap";


const StatisticItem = ({ productName, bought, throwOut}) => {

    return (
        <Col sm="4">
            <Card body>
                <CardTitle className="text-center" tag="h5">
                    {productName}
                </CardTitle>
                <CardText>
                    Bought: {bought}
                    <br />
                    Throw out: {throwOut}
                </CardText>
            </Card>
        </Col>
    );
}

export default StatisticItem;