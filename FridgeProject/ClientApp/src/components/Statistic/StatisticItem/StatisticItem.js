import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { CardTitle, Card, Col, CardText} from "reactstrap";


const StatisticItem = ({ productName, bought, throwOut}) => {
    const { t } = useTranslation();

    return (
        <Col sm="4">
            <Card body>
                <CardTitle className="text-center" tag="h5">
                    {productName}
                </CardTitle>
                <CardText>
                    {<Trans>{t("Bought")}</Trans>}: {bought}
                    <br />
                    {<Trans>{t("Throw")}</Trans>}: {throwOut}
                </CardText>
            </Card>
        </Col>
    );
}

export default StatisticItem;