import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import Avaliacoes from '../components/Avaliacoes';

class ProductDetails extends React.Component {
  render() {
    const { location: { state }, cart } = this.props;
    const totalCart = cart.reduce((acc, product) => (product.cartQuantity * 1) + acc, 0);
    return (
      <div>
        <div className="card mb-3" style={{ maxWidth: '700px' }}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={state.thumbnail} className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 data-testid="product-detail-name" className="card-title">{state.title}</h5>
                <p className="card-text">{` ${state.price} R$`}</p>
                <button type="button" className="btn btn-light">-</button>
                <span>1</span>
                <button type="button" className="btn btn-light">+</button>
                <button type="button" className="btn btn-primary">Adicionar ao carrinho</button>
                <FaShoppingCart className="mr-1" size={32} />
                <p className="mb-0">
                  <span data-testid="shopping-cart-size">{totalCart}</span> {totalCart === 1 ? 'item' : 'itens'}
                </p>
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
