import React, { useState } from 'react';
import { CardTitle, Card, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";


const FridgeItem = ({ fridgeId, fridgeName}) => {
    const [dropdownOpen, setOpen] = useState(false);

    return (
        <Col sm="4">
            <Card body>
                <CardTitle className="text-center" tag="h5">
                    {fridgeName}
                </CardTitle>
                <ButtonDropdown
                    isOpen={dropdownOpen} toggle={() => setOpen(!dropdownOpen)}
                >
                    <DropdownToggle caret>
                        Click Me
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>
                            Open
                        </DropdownItem>
                        <DropdownItem>
                            Edit
                        </DropdownItem>
                        <DropdownItem>
                            Delete
                        </DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </Card>
        </Col>
    );
}

export default FridgeItem;