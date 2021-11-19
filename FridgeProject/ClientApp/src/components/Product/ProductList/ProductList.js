import React from 'react'
import { Trans, useTranslation } from 'react-i18next';
import { Container, Row, Col } from "reactstrap";
import ProductItem from '../ProductItem/ProductItem';

const ProductList = ({ products, deleteProduct, editProduct, throwOutProduct }) => {
    const { t } = useTranslation();
    if (products.length === 0) {
        return (
            <Container style={{ backgroundColor: "#F2F2F2" }}>
                <Row className="text-center">
                    <Col className="col-12 my-5"><h2><Trans>{t("ListEmpty")}</Trans></h2></Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container style={{ backgroundColor: "#F2F2F2" }}>
            <Row>
                {
                    products.map((product) => <ProductItem throwOutProduct={throwOutProduct} deleteProduct={deleteProduct} editProduct={editProduct} key={product.productId} {...product} />)
                }
            </Row>
        </Container>
    );
};

export default ProductList;