import React from 'react';

const FilterBy = () => (
  <label className="text-muted ml-3" htmlFor="otherFilter">
    Filtrar por:
    <div id="otherFilter" className="d-flex mt-1">
      <div className="form-check mr-3">
        <input className="form-check-input" type="checkbox" id="freeShipping" value="option1" />
        <label className="form-check-label" htmlFor="freeShipping">Frete gratis</label>
      </div>
      <div className="form-check mr-3">
        <input className="form-check-input" type="checkbox" id="mercadopago" value="option2" />
        <label className="form-check-label" htmlFor="mercadopago">MercadoPago</label>
      </div>
      <div className="form-check mr-3">
        <input className="form-check-input" type="checkbox" id="new" value="option2" />
        <label className="form-check-label" htmlFor="new">Novo</label>
      </div>
      <div className="form-check mr-3">
        <input className="form-check-input" type="checkbox" id="used" value="option2" />
        <label className="form-check-label" htmlFor="used">Usado</label>
      </div>
      <div className="form-check mr-3">
        <input className="form-check-input" type="checkbox" id="discount" value="option2" />
        <label className="form-check-label" htmlFor="discount">Promocao</label>
      </div>
    </div>
  </label>
);

const OrderBy = (props) => {
  const { order, onFilterChange } = props;
  return (
    <label className="text-muted" htmlFor="orderFilter">
      Ordenar por:
      <select
        id="orderFilter"
        name="order"
        value={order}
        onChange={onFilterChange}
        className="form-control"
      >
        <option value="none" disabled>Nenhum</option>
        <option value="high">Maior preco</option>
        <option value="low">Menor preco</option>
      </select>
    </label>
  );
}

class FilterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'none',
    };
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { order: actualOrder } = this.state;
    const { order: prevOrder } = prevState;
    const { products, filterProducts } = this.props;

    if (prevOrder !== actualOrder) {
      if (actualOrder === 'low') {
        const orderedProducts = products.sort((a, b) => a.price - b.price);
        filterProducts(orderedProducts);
      } else if (actualOrder === 'high') {
        const orderedProducts = products.sort((a, b) => b.price - a.price);
        filterProducts(orderedProducts);
      }
    }
  }

  onFilterChange(event) {
    const { name, value } = event.target;
    this.setState((state) => ({ ...state, [name]: value }));
  }

  render() {
    return (
      <div className="col my-2">
        <div className="d-flex align-items-center">
          <OrderBy order={this.state.order} onFilterChange={this.onFilterChange} />
          {/*  -------------------------------------------------- */}
          <FilterBy />
          {/*  -------------------------------------------------- */}
        </div>
      </div>
    )
  }
}

export default FilterList;