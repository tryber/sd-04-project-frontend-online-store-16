import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList.jsx';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/product/:id" component={ProductDetails} />
        <Route path="/cart" component={ShoppingCart} />
        <Route path="/checkout" component={Checkout} />
      </Switch >
    );
  }
}

export default App;
