import React from 'react'
import { Container, Row, Col, Button } from "reactstrap";
import ProductList from './ProductList/ProductList';

const Product = () => {

    return (
        <Container>
            <Container>
                <Row>
                    <Col className="text-left"><h3>Products</h3></Col>
                    <Col className="text-right">
                        <Button color="success">
                            New Product
                        </Button>
                    </Col>
                </Row>
            </Container>
            <ProductList products={[5, 4]}/>
        </Container>
    );
};

export default Product;