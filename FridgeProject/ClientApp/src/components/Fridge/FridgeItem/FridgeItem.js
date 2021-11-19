import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
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
                            <Trans>{t("ClickMe")}</Trans>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => { history.push("/products/" + fridgeId) }}>
                                <Trans>{t("Open")}</Trans>
                            </DropdownItem>
                            <DropdownItem onClick={() => { history.push("/subscribers/" + fridgeId) }}>
                                <Trans>{t("Subscribers")}</Trans>
                            </DropdownItem>
                            <DropdownItem onClick={() => { editFridge(fridgeId, fridgeName); }}>
                                <Trans>{t("Edit")}</Trans>
                            </DropdownItem>
                            <DropdownItem onClick={() => { deleteFridge(fridgeId); }}>
                                <Trans>{t("Delete")}</Trans>
                            </DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                ) : (
                        <Button onClick={() => { history.push("/products/" + fridgeId) }}><Trans>{t("Open")}</Trans></Button>
                )}
            </Card>
        </Col>
    );
}

export default FridgeItem;