import React from 'react';
import { CardTitle, Card, Col, CardText, Button } from "reactstrap";


const FridgeItem = (props) => {

    return (
        <Col sm="4">
            <Card body>
                <CardTitle tag="h5">
                    Special Title Treatment
                </CardTitle>
                <CardText>
                    With supporting text below as a natural lead-in to additional content.
                </CardText>
                <Button>
                    Go somewhere
                </Button>
            </Card>
        </Col>
    );
}

export default FridgeItem;