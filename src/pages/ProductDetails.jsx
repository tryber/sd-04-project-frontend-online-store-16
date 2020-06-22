import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
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

const Buttons = () => (
  <div>
    <button type="button" className="btn btn-light">-</button>
    <span>1</span>
    <button type="button" className="btn btn-light">+</button>
    <button type="button" className="btn btn-primary">Adicionar ao carrinho</button>
  </div>
);


class ProductDetails extends React.Component {
  render() {
    const { location: { state }, cart } = this.props;
    const totalCart = cart.reduce((acc, product) => product.cartQuantity + acc, 0);
    return (
      <div>
        <CartIcon totalCart={totalCart} />
        <div className="card mb-3" style={{ maxWidth: '700px' }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={state.thumbnail} className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 data-testid="product-detail-name" className="card-title">{state.title}</h5>
                <p className="card-text">{` ${state.price} R$`}</p>
                <Buttons />
                <ul className="list-group">
                  {state.attributes
                    .map((att) => <li key={att.name} className="list-group-item">{`${att.name}: ${att.value_name}`}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Avaliacoes id={state.id} />
      </div>
    );
  }
}

export default ProductDetails;
