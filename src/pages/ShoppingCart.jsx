import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: '' };
  }

  render() {

    return (
      <div className="container-fluid">
        <div className="column">
          <Link to="/">Voltar</Link>
          <h4>Shopping Cart Page</h4>
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
