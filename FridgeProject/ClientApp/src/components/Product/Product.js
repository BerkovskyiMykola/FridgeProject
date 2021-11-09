import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container, Row, Col, Button } from "reactstrap";
import { clearMessage } from '../../actions/message';
import { createProduct, deleteProduct, editProduct, getAddedProducts, throwOutProduct } from '../../actions/product';
import { validateDescription, validateField, validateRequired } from '../../validation/validation';
import { Field } from '../FormComponents';
import ModalWindow from '../ModalWindow/ModalWindow';
import ProductList from './ProductList/ProductList';

const Product = (props) => {
    const fridgeId = props.match.params.fridgeId;
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalThrowOut, setModalThrowOut] = useState(false);

    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);
    const [productName, setProductName] = useState("");
    const [expirationDate, setExpirationDate] = useState(new Date().toISOString().substring(0, 10));
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [productId, setProductId] = useState(0);

    const dispatch = useDispatch();

    const { products, message, user, fridgeName } = useSelector(state => ({
        products: state.product.products,
        fridgeName: state.product.fridgeName,
        message: state.message.message,
        user: state.auth.user
    }), shallowEqual)

    useEffect(() => {
        dispatch(getAddedProducts(fridgeId))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [dispatch, fridgeId, props.history])

    const clearFields = () => {
        dispatch(clearMessage());
        setProductName("");
        setExpirationDate(new Date().toISOString().substring(0, 10));
        setDescription("");
        setAmount(0);
        setProductId(0);
    }

    const createRecord = () => {
        dispatch(createProduct(fridgeId, productName, expirationDate, description, amount))
            .then(() => {
                setModalAdd(false);
                clearFields();
            })
            .catch(() => { })
    }

    const editRecord = () => {
        dispatch(editProduct(productId, productName, expirationDate, description, amount))
            .then(() => {
                setModalEdit(false);
                clearFields();
            })
            .catch(() => { })
    }

    const throwOutRecord = () => {
        dispatch(throwOutProduct(productId, amount))
            .then(() => {
                setModalThrowOut(false);
                clearFields();
            })
            .catch(() => { })
    }

    const getProductValues = (productId, productName, expirationDate, description, amount) => {
        setProductName(productName);
        setExpirationDate(new Date(expirationDate).toISOString().substring(0, 10));
        setDescription(description);
        setAmount(amount);
        setProductId(productId);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const getValuesForThrowOut = (productId, amount) => {
        setAmount(amount);
        setProductId(productId);
        dispatch(clearMessage());
        setModalThrowOut(true);
    }

    const deleteRecord = (productId) => {
        dispatch(deleteProduct(productId))
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
                    <Col className="text-left"><h3>Fridge: {fridgeName}</h3></Col>
                    <Col className="text-right">
                        <Button color="success"
                            onClick={() => { setModalAdd(true); clearFields(); }}
                        >
                            New Product
                        </Button>
                    </Col>
                </Row>
            </Container>

            <ProductList products={products} deleteProduct={deleteRecord} editProduct={getProductValues} throwOutProduct={getValuesForThrowOut}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader="Add Product"
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton="Create" method={createRecord} form={form} message={message}
            >
                <Field title="Name of product" name="productName" value={productName}
                    setValue={(e) => { setProductName(e.target.value) }} validations={[validateRequired, validateField]} />
                <Field title="Expiration date" name="expirationDate" value={expirationDate} type="date"
                    setValue={(e) => { setExpirationDate(e.target.value) }} min={new Date().toISOString().substring(0, 10)} />
                <Field title="Description" name="description" value={description}
                    setValue={(e) => { setDescription(e.target.value) }} validations={[validateRequired, validateDescription]} />
                <Field title="Amount" name="amount" value={amount} type="number"
                    setValue={(e) => { setAmount(e.target.value) }} min={0} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader="Edit Product"
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton="Edit" method={editRecord} form={form} message={message}
            >
                <Field title="Name of product" name="productName" value={productName}
                    setValue={(e) => { setProductName(e.target.value) }} validations={[validateRequired, validateField]} />
                <Field title="Expiration date" name="expirationDate" value={expirationDate} type="date"
                    setValue={(e) => { setExpirationDate(e.target.value) }} min={new Date().toISOString().substring(0, 10)} />
                <Field title="Description" name="description" value={description}
                    setValue={(e) => { setDescription(e.target.value) }} validations={[validateRequired, validateDescription]} />
                <Field title="Amount" name="amount" value={amount} type="number"
                    setValue={(e) => { setAmount(e.target.value) }} min={0} />
            </ModalWindow>

            <ModalWindow modal={modalThrowOut} deactiveModal={() => setModalThrowOut(false)} textHeader="Throw Out Product"
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton="Throw Out" method={throwOutRecord} form={form} message={message}
            >
                <Field title="Amount" name="amount" value={amount} type="number"
                    setValue={(e) => { setAmount(e.target.value) }} min={0} />
            </ModalWindow>
        </Container>
    );
};

export default Product;