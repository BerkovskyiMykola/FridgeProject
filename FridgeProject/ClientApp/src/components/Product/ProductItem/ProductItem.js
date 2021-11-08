import React, { useState } from 'react';
import { CardTitle, Card, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, CardText } from "reactstrap";


const ProductItem = ({  }) => {
    const [dropdownOpen, setOpen] = useState(false);

    return (
        <Col sm="4">
            <Card body>
                <CardTitle className="text-center" tag="h5">
                    ProductName
                </CardTitle>
                <CardText>
                    Descrition
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