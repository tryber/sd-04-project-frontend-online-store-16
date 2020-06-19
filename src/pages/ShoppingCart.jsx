import React from 'react';
import { Link } from 'react-router-dom';

const CartItemCard = (props) => {
  const { thumbnail, title, price, cartQuantity } = props.product;
  return (
    <div>
      <img src={thumbnail} height={100} alt="" />
      <p data-testid="shopping-cart-product-name">{title}</p>
      <p>{price}</p>
      <p data-testid="shopping-cart-product-quantity">{cartQuantity}</p>
    </div>
  );
};

const ListItems = (props) => {
  const { products } = props;
  return (
    <section>
      {!products.length ? (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      ) : (
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
  render() {
    const { cart } = this.props;
    return (
      <div className="container-fluid">
        <div className="column">
          <Link to="/">Voltar</Link>
          <h4>Shopping Cart Page</h4>
          <ListItems products={cart} />
          <Link
            to="/checkout"
            data-testid="checkout-products"
            className="btn btn-primary"
          >
            Finalizar compra
          </Link>
        </div>
      </div>
    );
  }
}

export default ShoppingCart;
