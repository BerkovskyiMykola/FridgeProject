import React from 'react';
import { CardTitle, Card, Col, CardText, Button} from "reactstrap";


const HistoryItem = ({ historyId, productName, date, amount, deleteHistory}) => {

    return (
        <Col sm="4">
            <Card body>
                <CardTitle className="text-center" tag="h5">
                    {new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString()}
                </CardTitle>
                <CardText>
                    Name of product: {productName}
                    <br />
                    Amount: {amount}
                </CardText>
                <Button onClick={() => { deleteHistory(historyId) }}>Delete</Button>
            </Card>
        </Col>
    );
}

export default HistoryItem;