import React, { useState } from 'react';
import { CardTitle, Card, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, CardText } from "reactstrap";


const ProductItem = ({ productId, productName, expirationDate, description, amount }) => {
    const [dropdownOpen, setOpen] = useState(false);

    return (
        <Col sm="4">
            <Card body>
                <CardTitle className="text-center" tag="h5">
                    {productName}
                </CardTitle>
                <CardText>
                    <p>Expiration date: {new Date(expirationDate).toISOString().substring(0, 10)}</p>
                    <p>Description: {description}</p>
                    <p>Amount: {amount}</p>
                </CardText>
                <ButtonDropdown
                    isOpen={dropdownOpen} toggle={() => setOpen(!dropdownOpen)}
                >
                    <DropdownToggle caret>
                        Click Me
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            Edit
                        </DropdownItem>
                        <DropdownItem>
                            Delete
                        </DropdownItem>
                        <DropdownItem>
                            Throw out
                        </DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </Card>
        </Col>
    );
}

export default ProductItem;