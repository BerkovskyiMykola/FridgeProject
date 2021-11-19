import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { CardTitle, Card, Col, CardText, Button} from "reactstrap";


const HistoryItem = ({ historyId, productName, date, amount, deleteHistory}) => {
    const { t } = useTranslation();

    return (
        <Col sm="4">
            <Card body>
                <CardTitle className="text-center" tag="h5">
                    {new Date(date).toLocaleDateString() + " " + new Date(date).toLocaleTimeString()}
                </CardTitle>
                <CardText>
                    <Trans>{t("NameOfProduct")}</Trans>: {productName}
                    <br />
                    <Trans>{t("Amount")}</Trans>: {amount}
                </CardText>
                <Button onClick={() => { deleteHistory(historyId) }}>Delete</Button>
            </Card>
        </Col>
    );
}

export default HistoryItem;