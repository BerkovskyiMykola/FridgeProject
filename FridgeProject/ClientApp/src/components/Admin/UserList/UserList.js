import React from 'react'
import { Table, Container, Row, Col } from "reactstrap";
import UserItem from '../UserItem/UserItem';
import "./UserList.css";

const UserList = ({ users, deleteUser, editUser }) => {

    if (users.length === 0) {
        return (
            <Container style={{ backgroundColor: "#F2F2F2" }}>
                <Row className="text-center">
                    <Col className="col-12 my-5"><h2>User list is empty</h2></Col>
                </Row>
            </Container>
        );
    }

    return (
        <Table dark>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Firs name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>functions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((item, index) => (<UserItem key={item.id} item={item} index={index} deleteUser={deleteUser} editUser={editUser} />))}
            </tbody>
        </Table>
    );
};

export default UserList;