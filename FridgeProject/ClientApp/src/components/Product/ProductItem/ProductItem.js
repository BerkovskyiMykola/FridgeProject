import React, { useState } from 'react';
import { CardTitle, Card, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, CardText } from "reactstrap";


const ProductItem = ({ productId, productName, expirationDate, description, amount, deleteProduct, editProduct, throwOutProduct }) => {
    const [dropdownOpen, setOpen] = useState(false);

    return (
        <Col sm="4">
            <Card body>
                <CardTitle className="text-center" tag="h5">
                    {productName}
                </CardTitle>
                <CardText>
                    Expiration date: {new Date(expirationDate).toISOString().substring(0, 10)}
                    <br />
                    Description: {description}
                    <br />
                    Amount: {amount}
                </CardText>
                <ButtonDropdown
                    isOpen={dropdownOpen} toggle={() => setOpen(!dropdownOpen)}
                >
                    <DropdownToggle caret>
                        Click Me
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => editProduct(productId, productName, expirationDate, description, amount)}>
                            Edit
                        </DropdownItem>
                        <DropdownItem onClick={() => deleteProduct(productId) }>
                            Delete
                        </DropdownItem>
                        <DropdownItem onClick={() => throwOutProduct(productId, amount)}>
                            Throw out
                        </DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </Card>
        </Col>
    );
}

export default ProductItem;