﻿import React, { useState } from 'react';
import { CardTitle, Card, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from "reactstrap";


const FridgeItem = ({ fridgeId, fridgeName, deleteFridge, editFridge, isOwnFridge}) => {
    const [dropdownOpen, setOpen] = useState(false);

    return (
        <Col sm="4">
            <Card body>
                <CardTitle className="text-center" tag="h5">
                    {fridgeName}
                </CardTitle>
                {isOwnFridge ? (
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
                            <DropdownItem onClick={() => { editFridge(fridgeId, fridgeName); }}>
                                Edit
                            </DropdownItem>
                            <DropdownItem onClick={() => { deleteFridge(fridgeId); }}>
                                Delete
                            </DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                ) : (
                    <Button>Open</Button>
                )}
            </Card>
        </Col>
    );
}

export default FridgeItem;