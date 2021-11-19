import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next';
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
    const { t } = useTranslation();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalThrowOut, setModalThrowOut] = useState(false);

    const [form, setForm] = useState(null);
    const [checkBtn, setCheckBtn] = useState(null);
    const [productName, setProductName] = useState("");
    const [expirationDate, setExpirationDate] = useState(new Date(Date.now() + (3600 * 1000 * 24)).toISOString().substring(0, 10));
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
        setExpirationDate(new Date(Date.now() + (3600 * 1000 * 24)).toISOString().substring(0, 10));
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

    if (user.role === "Admin") {
        return <Redirect to="/users" />;
    }

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3><Trans>{t("Fridge")}</Trans>: {fridgeName}</h3></Col>
                    <Col className="text-right">
                        <Button color="success"
                            onClick={() => { setModalAdd(true); clearFields(); }}
                        >
                            <Trans>{t("NewProduct")}</Trans>
                        </Button>
                    </Col>
                </Row>
            </Container>

            <ProductList products={products} deleteProduct={deleteRecord} editProduct={getProductValues} throwOutProduct={getValuesForThrowOut}/>

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={<Trans>{t("AddProduct")}</Trans>}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton={<Trans>{t("Create")}</Trans>} method={createRecord} form={form} message={message}
            >
                <Field title={<Trans>{t("NameOfProduct")}</Trans>} name="productName" value={productName}
                    setValue={(e) => { setProductName(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field title={<Trans>{t("ExpirationDate")}</Trans>} name="expirationDate" value={expirationDate} type="date"
                    setValue={(e) => { setExpirationDate(e.target.value) }} min={new Date(Date.now() + (3600 * 1000 * 24)).toISOString().substring(0, 10)} />
                <Field title={<Trans>{t("Description")}</Trans>} name="description" value={description}
                    setValue={(e) => { setDescription(e.target.value) }} validations={[validateRequired(t), validateDescription(t)]} />
                <Field title={<Trans>{t("Amount")}</Trans>} name="amount" value={amount} type="number"
                    setValue={(e) => { setAmount(e.target.value) }} min={0} />
            </ModalWindow>

            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={<Trans>{t("EditProduct")}</Trans>}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton={<Trans>{t("Edit")}</Trans>} method={editRecord} form={form} message={message}
            >
                <Field title={<Trans>{t("NameOfProduct")}</Trans>} name="productName" value={productName}
                    setValue={(e) => { setProductName(e.target.value) }} validations={[validateRequired(t), validateField(t)]} />
                <Field title={<Trans>{t("ExpirationDate")}</Trans>} name="expirationDate" value={expirationDate} type="date"
                    setValue={(e) => { setExpirationDate(e.target.value) }} min={new Date(Date.now() + (3600 * 1000 * 24)).toISOString().substring(0, 10)} />
                <Field title={<Trans>{t("Description")}</Trans>} name="description" value={description}
                    setValue={(e) => { setDescription(e.target.value) }} validations={[validateRequired(t), validateDescription(t)]} />
                <Field title={<Trans>{t("Amount")}</Trans>} name="amount" value={amount} type="number"
                    setValue={(e) => { setAmount(e.target.value) }} min={0} />
            </ModalWindow>

            <ModalWindow modal={modalThrowOut} deactiveModal={() => setModalThrowOut(false)} textHeader={<Trans>{t("ThrowOutProduct")}</Trans>}
                setForm={(c) => { setForm(c); }} checkBtn={checkBtn} setCheckBtn={(c) => { setCheckBtn(c); }}
                textButton={<Trans>{t("ThrowOut")}</Trans>} method={throwOutRecord} form={form} message={message}
            >
                <Field title={<Trans>{t("Amount")}</Trans>} name="amount" value={amount} type="number"
                    setValue={(e) => { setAmount(e.target.value) }} min={0} />
            </ModalWindow>
        </Container>
    );
};

export default Product;