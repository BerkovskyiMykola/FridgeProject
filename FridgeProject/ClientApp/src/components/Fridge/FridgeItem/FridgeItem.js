import React, { useState } from 'react';
import {  useTranslation } from 'react-i18next';
import { CardTitle, Card, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button} from "reactstrap";


const FridgeItem = ({ fridgeId, fridgeName, deleteFridge, editFridge, isOwnFridge, history}) => {
    const [dropdownOpen, setOpen] = useState(false);
    const { t } = useTranslation();

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
                            {t("ClickMe")}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => { history.push("/products/" + fridgeId) }}>
                                {t("Open")}
                            </DropdownItem>
                            <DropdownItem onClick={() => { history.push("/subscribers/" + fridgeId) }}>
                                {t("Subscribers")}
                            </DropdownItem>
                            <DropdownItem onClick={() => { editFridge(fridgeId, fridgeName); }}>
                                {t("Edit")}
                            </DropdownItem>
                            <DropdownItem onClick={() => { deleteFridge(fridgeId); }}>
                                {t("Delete")}
                            </DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                ) : (
                        <Button onClick={() => { history.push("/products/" + fridgeId) }}>{t("Open")}</Button>
                )}
            </Card>
        </Col>
    );
}

export default FridgeItem;