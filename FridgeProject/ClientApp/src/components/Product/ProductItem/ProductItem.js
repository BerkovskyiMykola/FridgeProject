import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { CardTitle, Card, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, CardText } from "reactstrap";


const ProductItem = ({ productId, productName, expirationDate, description, amount, deleteProduct, editProduct, throwOutProduct }) => {
    const [dropdownOpen, setOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <Col sm="4">
            <Card body>
                <CardTitle className="text-center" tag="h5">
                    {productName}
                </CardTitle>
                <CardText>
                    {<Trans>{t("ExpirationDate")}</Trans>}: {new Date(expirationDate).toISOString().substring(0, 10)}
                    <br />
                    {<Trans>{t("Description")}</Trans>}: {description}
                    <br />
                    {<Trans>{t("Amount")}</Trans>}: {amount}
                </CardText>
                <ButtonDropdown
                    isOpen={dropdownOpen} toggle={() => setOpen(!dropdownOpen)}
                >
                    <DropdownToggle caret>
                        {<Trans>{t("ClickMe")}</Trans>}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => editProduct(productId, productName, expirationDate, description, amount)}>
                            {<Trans>{t("Edit")}</Trans>}
                        </DropdownItem>
                        <DropdownItem onClick={() => deleteProduct(productId) }>
                            {<Trans>{t("Delete")}</Trans>}
                        </DropdownItem>
                        <DropdownItem onClick={() => throwOutProduct(productId, amount)}>
                            {<Trans>{t("ThrowOut")}</Trans>}
                        </DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </Card>
        </Col>
    );
}

export default ProductItem;