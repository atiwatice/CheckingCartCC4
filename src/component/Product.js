import React, { Component } from "react";
import { Button, Card, Row, Typography } from "antd";
const { Text } = Typography;
export default class Product extends Component {
  render() {
    const product = this.props.productDetail;
    return (
      <Card hoverable cover={<img src={product.image} />}>
        <h4 style={{ height: "120px" }}>{product.name}</h4>
        <p style={{ height: "250px", overflowY: "scroll" }}>
          {product.description}
        </p>
        <Row>
          <Text code>{product.price} Baht</Text>

          <Button onClick={() => this.props.handleClickAddToCard(product)}>
            {" "}
            Add to cart
          </Button>
        </Row>
      </Card>
    );
  }
}
