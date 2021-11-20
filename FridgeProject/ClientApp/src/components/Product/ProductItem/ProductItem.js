import React, { useState } from 'react';
import {  useTranslation } from 'react-i18next';
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
                    {t("ExpirationDate")}: {new Date(expirationDate).toISOString().substring(0, 10)}
                    <br />
                    {t("Description")}: {description}
                    <br />
                    {t("Amount")}: {amount}
                </CardText>
                <ButtonDropdown
                    isOpen={dropdownOpen} toggle={() => setOpen(!dropdownOpen)}
                >
                    <DropdownToggle caret>
                        {t("ClickMe")}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => editProduct(productId, productName, expirationDate, description, amount)}>
                            {t("Edit")}
                        </DropdownItem>
                        <DropdownItem onClick={() => deleteProduct(productId) }>
                            {t("Delete")}
                        </DropdownItem>
                        <DropdownItem onClick={() => throwOutProduct(productId, amount)}>
                            {t("ThrowOut")}
                        </DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </Card>
        </Col>
    );
}

export default ProductItem;