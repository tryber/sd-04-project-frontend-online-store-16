import React from 'react';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: '' };
  }

  render() {
    const { products } = this.state;
    if (products === '') {
      return <span data-testid="shopping-cart-empty-message">Seu carrinho está vazio</span>;
    }
    return <h1>Shopping Cart Page</h1>;
  }
}

export default ShoppingCart;
