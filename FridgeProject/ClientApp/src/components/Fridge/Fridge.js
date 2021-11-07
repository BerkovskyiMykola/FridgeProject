import React, { useState } from 'react'
import { Container, Row, Button, Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import FridgeList from './FridgeList/FridgeList';

const Fridge = (props) => {
    const [selectedTab, setSelectedTab] = useState("1");
    const [activeLink, setActiveLink] = useState("1");

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>Fridge</h3></Col>
                    <Col className="text-right"><Button color="success">New Fridge</Button></Col>
                </Row>
            </Container>
            <Nav fill tabs>
                <NavItem>
                    <NavLink
                        className={activeLink==="1" ? "active" : ""}
                        onClick={() => { setSelectedTab("1"); setActiveLink("1") }}
                    >
                        Own
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={activeLink === "2" ? "active" : ""}
                        onClick={() => { setSelectedTab("2"); setActiveLink("2") }}
                    >
                        Shared
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={selectedTab}>
                <TabPane tabId="1">
                    <FridgeList />
                </TabPane>
                <TabPane tabId="2">
                    <FridgeList />
                </TabPane>
            </TabContent>
        </Container>
    );
};

export default Fridge;