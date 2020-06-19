import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';
import { ShoppingCart } from './pages/ShoppingCart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
    this.addProductToCart = this.addProductToCart.bind(this);
  }

  addProductToCart(product) {
    const { cart } = this.state;
    const cartProduct = cart.find(cartProduct => cartProduct.id === product.id);
    if(cartProduct){
      cartProduct.cartQuantity += 1;
    } else {
      product.cartQuantity = 1;
      this.setState({ cart: [...cart, product] });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => (<ProductList {...props} addToCart={this.addProductToCart} />)} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/cart" render={(props) => (<ShoppingCart {...props} cart={this.state.cart} />)} />
          <Route path="/checkout" render={(props) => (<Checkout {...props} cart={this.state.cart} />)} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
