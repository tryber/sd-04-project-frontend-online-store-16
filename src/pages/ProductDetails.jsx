import React from 'react';
import { FaTruck, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Avaliacoes from '../components/Avaliacoes';

const CartIcon = (props) => {
  const { totalCart } = props;
  return (
    <div className="col-2 pl-0">
      <Link
        className="d-flex align-items-center"
        data-testid="shopping-cart-button"
        to="/cart"
      >
        <FaShoppingCart className="mr-1" size={32} />
        <p className="mb-0">
          <span data-testid="shopping-cart-size">{`${totalCart} `}</span>
          {totalCart === 1 ? 'item' : 'itens'}
        </p>
      </Link>
    </div>
  );
};

const Buttons = (props) => {
  const { increaseOrDecrease, addToCart, product, cart } = props;
  const foundProduct = cart.find((cartProduct) => cartProduct.id === product.id);
  return (
    <div>
      <button
        type="button"
        className="btn mx-2 my-0 p-0 bg-transparent"
        onClick={() => increaseOrDecrease(product, false)}
      >
        <FaMinus size={12} />
      </button>
      <span>{foundProduct ? foundProduct.cartQuantity : 0}</span>
      <button
        type="button"
        className="btn mx-2 my-0 p-0 bg-transparent"
        onClick={() => increaseOrDecrease(product)}
      >
        <FaPlus size={12} />
      </button>
      <button
        type="button"
        className="btn btn-primary mb-2"
        data-testid="product-detail-add-to-cart"
        onClick={() => addToCart(product)}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
};

const CardBody = (props) => {
  const { increaseOrDecrease, addToCart, product, cart } = props;
  return (
    <div className="col">
      <div className="card-body">
        <h5 data-testid="product-detail-name" className="card-title">{product.title}</h5>
        <p className="card-text">{` ${product.price} R$`}</p>
        <Buttons
          increaseOrDecrease={increaseOrDecrease}
          addToCart={addToCart}
          product={product}
          cart={cart}
        />
        {product.shipping.free_shipping && (
          <div className="my-3">
            <span data-testid="free-shipping" className="bg-success p-2 br-5 ml-1 my-4">
              <FaTruck className="mr-1" /> Frete gratis
            </span>
          </div>
        )}
        <ul className="list-group">
          {product.attributes
            .map((att) => <li key={att.name} className="list-group-item">{`${att.name}: ${att.value_name}`}</li>)}
        </ul>
      </div>
    </div>
  );
};

class ProductDetails extends React.Component {
  render() {
    const { location: { state }, cart, increaseOrDecreaseProductQuantity, addToCart } = this.props;
    const totalCart = cart.reduce((acc, product) => product.cartQuantity + acc, 0);
    return (
      <div>
        <CartIcon totalCart={totalCart} />
        <div className="card mb-3" style={{ maxWidth: '700px' }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={state.thumbnail} className="card-img" alt="..." />
            </div>
            <CardBody
              increaseOrDecrease={increaseOrDecreaseProductQuantity}
              addToCart={addToCart}
              product={state}
              cart={cart}
            />
          </div>
        </div>
        <Avaliacoes id={state.id} />
      </div>
    );
  }
}

export default ProductDetails;
