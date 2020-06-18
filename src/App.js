import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList.jsx';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/product/:id" component={ProductDetails} />
          <Route path="/cart" component={ShoppingCart} />
          <Route path="/checkout" component={Checkout} />
        </Switch >
      </BrowserRouter>
    );
  }
}

export default App;
