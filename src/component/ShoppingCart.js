//imr
// import React from 'react'
//rcep
import React, { Component } from "react";
import PropTypes from "prop-types";
import Categories from "./Categories";

import Cart from "./Cart";
import { Row, Col } from "antd";
import Products from "./Products";
import {uniqueId} from 'lodash'
import Axios from 'axios'

export class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        
      ],
      productsList: [
        
      ],
      cart: [],
      selectedCategoriesId: null
    };
    this.handleCategoryID = this.handleCategoryID.bind(this)
    this.handleClickAddToCard = this.handleClickAddToCard.bind(this)
    this.handleClickDeleteProductIncart = this.handleClickDeleteProductIncart.bind(this)
    this.handleDeleteAllProductInCart= this.handleDeleteAllProductInCart.bind(this)
  }

async componentDidMount(){
  const result1 = await Axios.get('http://localhost:3030/product-category')
  const result2 = await Axios.get('http://localhost:3030/product')
  this.setState({
    productsList:result2.data,
    categories:result1.data,
    selectedCategoriesId: result1.data[0].id
  })
  // Axios.get('http://localhost:3030/product-category').then(result=>{
  // console.log(result)
  // })

}


  filterProduct() {
    const id = this.state.selectedCategoriesId;
    if (id == null) {
      return [];
    } else {
      return this.state.productsList.filter(
        product => product.ProductCategoryId == id
      );
    }
  }

  handleClickDeleteProductIncart(uid){
    this.setState({cart: this.state.cart.filter(cartItem=> cartItem.product.id!==uid)})
  }
  handleDeleteAllProductInCart(){
    this.setState({cart:[]})
  }

  handleCategoryID(id) {
    this.setState({
      selectedCategoriesId: id
    });
  }

  handleClickAddToCard(product){
    if(this.state.cart.find(cartItem => cartItem.product.id===product.id)){
      this.setState({
        cart : this.state.cart.map(cartItem=>
          cartItem.product.id === product.id ? 
          {...cartItem, amount: cartItem.amount+1}:cartItem)
      })
    }else{
      this.setState({
        cart: [...this.state.cart, {uid:uniqueId(), product, amount: 1}]
      })
    }
  }

  render() {
    return (
      <Row type="flex" justify="center">
        <Col span={3}>
          <Categories
            categories={this.state.categories}
            handleCategoryIDFuntion={this.handleCategoryID}
            selectedID = {this.state.selectedCategoriesId}
          />
        </Col>
        <Col span={13}>
          <Products products={this.filterProduct()}
          handleClickAddToCard = {this.handleClickAddToCard}
          />
        </Col>
        <Col span={6}>
          <Cart cart = {this.state.cart}
          handleClickDeleteProductIncart ={this.handleClickDeleteProductIncart}
          handleDeleteAllProductInCart = {this.handleDeleteAllProductInCart}
          />
        </Col>
      </Row>
    );
  }
}

export default ShoppingCart;
