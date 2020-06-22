import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import ProductList from './pages/ProductList';
import ShoppingCart from './pages/ShoppingCart';

function generateRoute(path, render, exact = false) {
  return <Route exact={exact} path={path} render={render} />;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
    this.addProductToCart = this.addProductToCart.bind(this);
    this.increaseOrDecreaseProductQuantity = this.increaseOrDecreaseProductQuantity.bind(this);
    this.removeProductFromCart = this.removeProductFromCart.bind(this);
  }

  increaseOrDecreaseProductQuantity(product, increase = true) {
    const { cart } = this.state;
    const foundProduct = cart.find((cartProduct) => cartProduct.id === product.id);
    if (increase && foundProduct.cartQuantity < foundProduct.available_quantity) {
      foundProduct.cartQuantity += 1;
    } else if (foundProduct.cartQuantity > 1) {
      foundProduct.cartQuantity -= 1;
    }
    this.setState({ cart: [...cart] });
  }

  removeProductFromCart(product) {
    const { cart } = this.state;
    const newCart = cart.filter((cartProduct) => cartProduct.id !== product.id);
    this.setState({ cart: newCart });
  }

  addProductToCart(product) {
    const { cart } = this.state;
    const foundProduct = cart.find((cartProduct) => cartProduct.id === product.id);
    if (foundProduct) {
      if (foundProduct.cartQuantity < foundProduct.available_quantity) {
        foundProduct.cartQuantity += 1;
      }
      this.setState({ cart: [...cart] });
    } else {
      const newProduct = { ...product, cartQuantity: 1 };
      this.setState({ cart: [...cart, newProduct] });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {generateRoute('/', (props) => (
            <ProductList {...props} cart={this.state.cart} addToCart={this.addProductToCart} />
          ), true)}
          {generateRoute('/product/:id', (props) => (<ProductDetails
            {...props}
            cart={this.state.cart}
            addToCart={this.addProductToCart}
            increaseOrDecreaseProductQuantity={this.increaseOrDecreaseProductQuantity}
          />))}
          {generateRoute('/cart', (props) => (<ShoppingCart
            {...props}
            cart={this.state.cart}
            removeProductFromCart={this.removeProductFromCart}
            increaseOrDecreaseProductQuantity={this.increaseOrDecreaseProductQuantity}
          />))}
          {generateRoute('/checkout', (props) =>
            (<Checkout {...props} cart={this.state.cart} />),
          )}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
