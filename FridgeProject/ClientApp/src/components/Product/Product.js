import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Button } from "reactstrap";
import { createProduct, getAddedProducts } from '../../actions/product';
import { validateField } from '../../validation/validation';
import ProductList from './ProductList/ProductList';

const Product = (props) => {
    const fridgeId = props.match.params.fridgeId;
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);

    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);
    const [productName, setProductName] = useState("");
    const [expirationDate, setExpirationDate] = useState(new Date());
    const [description, setDescription] = useState(null);
    const [amount, setAmount] = useState(0);

    const dispatch = useDispatch();

    const { products, message, user, fridgeName } = useSelector(state => ({
        products: state.product.products,
        fridgeName: state.subscriber.fridgeName,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getAddedProducts(fridgeId))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [dispatch, fridgeId, props.history])

    const createRecord = () => {
        //dispatch(createProduct(email, fridgeId))
        //    .then(() => {
        //        setModalAdd(false);
        //        dispatch(clearMessage());
        //        setEmail("");
        //    })
        //    .catch(() => { })
    }

    if (!user) {
        return <Redirect to="/login" />;
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>Fridge: {fridgeName}</h3></Col>
                    <Col className="text-right">
                        <Button color="success"
                            onClick={() => { setModalAdd(true); }}
                        >
                            New Product
                        </Button>
                    </Col>
                </Row>
            </Container>
            <ProductList products={products} />
            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader="Add Product"
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton="Create" method={createRecord} form={form} message={message}
            >
                <Field title="Name of product" name="productName" value={productName}
                    setValue={(e) => { setProductName(e.target.value) }} validations={[validateField, validateField]} />
                <Field title="Expiration date" name="expirationDate" value={expirationDate}
                    setValue={(e) => { setExpirationDate(e.target.value) }} validations={} />
            </ModalWindow>
        </Container>
    );
};

export default Product;