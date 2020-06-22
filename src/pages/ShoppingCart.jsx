import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaPlus, FaMinus } from 'react-icons/fa';

const CartItemCard = (props) => {
  const { product, increaseOrDecreaseProductQuantity, removeProductFromCart } = props;
  const { thumbnail, title, price, cartQuantity } = product;
  return (
    <li className="list-group-item d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <button className="mx-2 btn p-0 bg-transparent" onClick={() => removeProductFromCart(product)}>
          <FaTrashAlt className="mx-2" />
        </button>
        <img src={thumbnail} height={100} alt="" />
        <div className="ml-3">
          <p data-testid="shopping-cart-product-name">{title}</p>
          <p>R$ {Number(price).toFixed(2)}</p>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <small>Quantidade: </small>
        <button
          className="mx-2 btn p-0 bg-transparent"
          data-testid="product-decrease-quantity"
          onClick={() => increaseOrDecreaseProductQuantity(product, false)}
        >
          <FaMinus size={12} />
        </button>
        <p className="mb-0 mx-2">
          <strong data-testid="shopping-cart-product-quantity">{cartQuantity}</strong>
        </p>
        <button
          className="mx-2 my-0 btn p-0 bg-transparent"
          data-testid="product-increase-quantity"
          onClick={() => increaseOrDecreaseProductQuantity(product)}
        >
          <FaPlus size={12} />
        </button>
      </div>
    </li>
  );
};

const ListItems = (props) => {
  const { products, increaseOrDecreaseProductQuantity, removeProductFromCart } = props;
  const totalPrice = products.reduce((acc, product) => (product.price * product.cartQuantity) + acc, 0);
  return (
    <div className="card w-100 mb-3">
      <div className="card-header text-center">
        Carrinho de compras
      </div>
      {!products.length ? (
        <p className="text-center m-3" data-testid="shopping-cart-empty-message">Seu carrinho está vazio :(</p>
      ) : (
          <ul className="list-group list-group-flush">
            {products.map((product) => (
              <CartItemCard
                key={product.id}
                product={product}
                removeProductFromCart={removeProductFromCart}
                increaseOrDecreaseProductQuantity={increaseOrDecreaseProductQuantity}
              />
            ))}
            <li className="list-group-item d-flex justify-content-end ">Total: R$ {totalPrice.toFixed(2)}</li>
          </ul>
        )}
    </div>
  );
};

class ShoppingCart extends React.Component {
  render() {
    const { cart, increaseOrDecreaseProductQuantity, removeProductFromCart } = this.props;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <div className="row justify-content-start my-3">
              <Link to="/">Voltar</Link>
            </div>
            <div className="row justify-content-center">
              <ListItems
                products={cart}
                removeProductFromCart={removeProductFromCart}
                increaseOrDecreaseProductQuantity={increaseOrDecreaseProductQuantity}
              />
            </div>
            {cart.length ? (
              <div className="row justify-content-center mb-3">
                <Link
                  to="/checkout"
                  data-testid="checkout-products"
                  className="btn btn-primary"
                >
                  Finalizar compra
              </Link>
              </div>
            ) : ('')}
          </div>
        </div>

      </div>
    );
  }
}

export default ShoppingCart;
