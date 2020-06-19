import React from 'react';
import { Link } from 'react-router-dom';

const CartItemCard = (props) => {
  const { thumbnail, title, price } = props.product;
  return (
    <div>
      <img src={thumbnail} height={100} alt="" />
      <p>{title}</p>
      <p>{price}</p>
    </div>
  );
};

const ListItems = (props) => {
  const { products } = props;
  return (
    <section>
      {products[0] === [] && (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      )}
      {products[0] !== [] && (
        <div className="row">
          {products.map((product) => (
            <CartItemCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

class ShoppingCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  render() {
    const { products } = this.state;
    return (
      <div className="container-fluid">
        <div className="column">
          <Link to="/">Voltar</Link>
          <h4>Shopping Cart Page</h4>

          <ListItems products={products} />
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
