import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { getOwnFridges, getSharedFridges } from '../../actions/fridge';
import FridgeList from './FridgeList/FridgeList';
import AddModalWindow from './ModalWindows/AddModalWindow';

const Fridge = (props) => {
    const [selectedTab, setSelectedTab] = useState("1");
    const [modalAdd, setModalAdd] = useState(false);

    const dispatch = useDispatch();

    const { ownFridges, sharedFridges  } = useSelector(state => ({
        ownFridges: state.fridge.ownFridges,
        sharedFridges: state.fridge.sharedFridges
    }), shallowEqual)

    useEffect(() => {
        dispatch(getOwnFridges());
        dispatch(getSharedFridges())
    }, [dispatch])

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>Fridges</h3></Col>
                    <Col className="text-right"><Button disabled={selectedTab === "2"} color="success" onClick={() => setModalAdd(true)}>New Fridge</Button></Col>
                </Row>
            </Container>
            <Nav fill tabs>
                <NavItem>
                    <NavLink
                        className={selectedTab==="1" ? "active" : ""}
                        onClick={() => { setSelectedTab("1"); }}
                    >
                        Own
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={selectedTab === "2" ? "active" : ""}
                        onClick={() => { setSelectedTab("2"); }}
                    >
                        Shared
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={selectedTab}>
                <TabPane tabId="1">
                    <FridgeList fridges={ownFridges}/>
                </TabPane>
                <TabPane tabId="2">
                    <FridgeList fridges={sharedFridges}/>
                </TabPane>
            </TabContent>
            <AddModalWindow modalAdd={modalAdd} deactiveModalAdd={() => setModalAdd(false)}/>
        </Container>
    );
};

export default Fridge;