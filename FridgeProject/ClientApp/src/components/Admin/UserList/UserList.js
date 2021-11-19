import React from 'react'
import { Trans, useTranslation } from 'react-i18next';
import { Table, Container, Row, Col } from "reactstrap";
import UserItem from '../UserItem/UserItem';
import "./UserList.css";

const UserList = ({ users, deleteUser, editUser }) => {

    const { t } = useTranslation();

    if (users.length === 0) {
        return (
            <Container style={{ backgroundColor: "#F2F2F2" }}>
                <Row className="text-center">
                    <Col className="col-12 my-5"><h2><Trans>{t("ListEmpty")}</Trans></h2></Col>
                </Row>
            </Container>
        );
    }

    return (
        <Table dark>
            <thead>
                <tr>
                    <th>#</th>
                    <th><Trans>{t("Firsname")}</Trans></th>
                    <th><Trans>{t("Lastname")}</Trans></th>
                    <th><Trans>{t("Email")}</Trans></th>
                    <th><Trans>{t("Role")}</Trans></th>
                    <th><Trans>{t("functions")}</Trans></th>
                </tr>
            </thead>
            <tbody>
                {users.map((item, index) => (<UserItem key={item.userId} item={item} index={index} deleteUser={deleteUser} editUser={editUser} />))}
            </tbody>
        </Table>
    );
};

export default UserList;