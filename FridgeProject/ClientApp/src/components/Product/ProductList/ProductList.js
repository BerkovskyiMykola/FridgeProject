import React from 'react'
import { Container, Row, Col } from "reactstrap";
import ProductItem from '../ProductItem/ProductItem';

const ProductList = ({ products, deleteProduct, editProduct, throwOutProduct }) => {

    if (products.length === 0) {
        return (
            <Container style={{ backgroundColor: "#F2F2F2" }}>
                <Row className="text-center">
                    <Col className="col-12 my-5"><h2>Product list is empty</h2></Col>
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