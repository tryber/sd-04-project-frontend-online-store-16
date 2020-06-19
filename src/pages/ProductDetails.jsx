import React from 'react';
import Avaliacoes from '../components/Avaliacoes';
// import * as api from '../services/api';

class ProductDetails extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { data: '' };
  // }

  // componentDidMount() {
  //   const {  } = this.props.match.params;
  // }
  render() {
    const { location: { state } } = this.props;
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
                <ul className="list-group">
                  {state.attributes.map((att) => <li className="list-group-item">{`${att.name}: ${att.value_name}`}</li>)}
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
