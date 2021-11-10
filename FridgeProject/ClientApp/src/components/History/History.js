import React, { useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from "reactstrap";
import { Redirect } from 'react-router-dom';
import { deleteHistory, getHistories } from '../../actions/history';
import HistoryList from './HistoryList/HistoryList';

const History = (props) => {
    const dispatch = useDispatch();

    const { user, histories  } = useSelector(state => ({
        histories: state.history.histories,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getHistories());
    }, [dispatch])

    const deleteRecord = (id) => {
        dispatch(deleteHistory(id))
            .then(() => { })
            .catch(() => { })
    }

    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>Histories</h3></Col>
                </Row>
            </Container>
            <HistoryList histories={histories} deleteHistory={deleteRecord}/>
        </Container>
    );
};

export default History;