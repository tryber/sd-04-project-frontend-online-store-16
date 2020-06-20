import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa'

import * as api from '../services/api';
import SearchBar from '../components/SearchBar';
import CategoriesList from '../components/CategoriesList';

import './ProductList.css';

const ProductCard = (props) => {
  const { id, thumbnail, title, price } = props.product;
  const isInCart = props.cart.some(cartProduct => cartProduct.id === id);
  return (
    <div className="col-4 mb-4">
      <div data-testid="product" className={`card ${isInCart ? 'bg-success text-white' : ''}`}>
        <Link className={`${isInCart ? 'text-white' : ''}`} data-testid="product-detail-link" to={`/product/${id}`}>
          <img className="card-img-top img-responsive" height={150} src={thumbnail} alt="" />
          <div className="card-header text-center min-height">
            {title}
          </div>
        </Link>
        <div className="card-body d-flex flex-column justify-content-center">
          <p className="card-text text-center">R$ {Number(price).toFixed(2)}</p>
          <button
            data-testid="product-add-to-cart"
            className="btn btn-primary"
            onClick={() => props.addToCart(props.product)}
          >
            Adicionar ao carrinho
        </button>
        </div>

      </div>

    </div>

  );
};

class FilterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'none',
      freeShipping: false,
    };
    this.onFilterChange = this.onFilterChange.bind(this);
  }

  onFilterChange(event) {
    const { name, value } = event.target;
    this.setState((state) => ({ ...state, [name]: value }));
  }

  componentDidUpdate(prevProps, prevState) {
    const { order: actualOrder } = this.state;
    const { order: prevOrder } = prevState;
    const { products, filterProducts } = this.props;

    if (prevOrder !== actualOrder) {
      if (actualOrder === 'low') {
        const orderedProducts = products.sort((a, b) => a.price - b.price);
        filterProducts(orderedProducts);
      }
      else if (actualOrder === 'high') {
        const orderedProducts = products.sort((a, b) => b.price - a.price);
        filterProducts(orderedProducts);
      }
    }
  }

  render() {
    return (
      <div className="col my-2">
        <div className="d-flex align-items-center">
          <label className="text-muted">
            Ordenar por:
            <select name="order" onChange={this.onFilterChange} className="form-control">
              <option value="none" disabled selected>Nenhum</option>
              <option value="high">Maior preco</option>
              <option value="low">Menor preco</option>
            </select>
          </label>
          {/*  ----------- AINDA NAO FUNCIONA ------------------- */}
          <label className="text-muted ml-3">
            Filtrar por:
            <div className="d-flex mt-1">
              <div className="form-check mr-3">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
                <label className="form-check-label" for="inlineCheckbox1">Frete gratis</label>
              </div>
              <div className="form-check mr-3">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label className="form-check-label" for="inlineCheckbox2">MercadoPago</label>
              </div>
              <div className="form-check mr-3">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label className="form-check-label" for="inlineCheckbox2">Novo</label>
              </div>
              <div className="form-check mr-3">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label className="form-check-label" for="inlineCheckbox2">Usado</label>
              </div>
              <div className="form-check mr-3">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
                <label className="form-check-label" for="inlineCheckbox2">Promocao</label>
              </div>
            </div>
          </label>
          {/*  ---------------------------------------------------- */}
          {/* <select name="order" onChange={this.onFilterChange} className="custom-select">
            <option value="none" disabled selected>Nenhum</option>
            <option value="high">Maior preco</option>
            <option value="low">Menor preco</option>
          </select> */}
        </div>
      </div>
    )
  }
}

const List = (props) => {
  const { products, addToCart, cart } = props;
  return (
    <div>
      {products[0] === 'initial' && (
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>
      )}
      {products[0] !== 'initial' && (
        <div className="row align-items-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} cart={cart} addToCart={addToCart} />
          ))}
        </div>
      )}
      {!products.length && (
        <h4>
          Nenhum produto foi encontrado
        </h4>
      )}
    </div>
  );
};

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: {},
      products: ['initial'],
    };
    this.resetSelectedCategory = this.resetSelectedCategory.bind(this);
    this.onSelectedCategoryChange = this.onSelectedCategoryChange.bind(this);
    this.searchApi = this.searchApi.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
  }

  filterProducts(products) {
    this.setState((state) => ({ ...state, products }));
  }

  onSelectedCategoryChange(category) {
    this.setState((state) => ({ ...state, selectedCategory: category }));
    api.getProductsFromCategoryAndQuery(category.id, '')
      .then((data) => this.setState((state) => ({ ...state, products: data.results })));
  }

  resetSelectedCategory() {
    this.setState((state) => ({ ...state, selectedCategory: {} }));
  }

  searchApi(searchInput) {
    const { selectedCategory } = this.state;
    api.getProductsFromCategoryAndQuery(selectedCategory.id, searchInput)
      .then((data) => this.setState((state) => ({ ...state, products: data.results })));
  }

  render() {
    const { selectedCategory, products } = this.state;
    const { addToCart, cart } = this.props;
    const totalCart = cart.reduce((acc, product) => (product.cartQuantity * 1) + acc, 0);

    return (
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-3">
            <CategoriesList
              selectedCategory={selectedCategory}
              onSelectCategory={this.onSelectedCategoryChange}
              resetSelectedCategory={this.resetSelectedCategory}
            />
          </div>
          <div className="col-9">
            <div className="row align-items-center">
              <div className="col pr-0">
                <SearchBar
                  searchApi={this.searchApi}
                />
              </div>
              <div className="col-2 pl-0">
                <Link className="d-flex align-items-center" data-testid="shopping-cart-button" to="/cart">
                  <FaShoppingCart className="mr-1" size={32} /> {totalCart} {totalCart === 1 ? ('item') : ('itens')}
                </Link>
              </div>
            </div>
            <div className="row">
              <FilterList products={products} filterProducts={this.filterProducts} />
            </div>
            <div className="row">
              <div className="col-12">
                <List products={products} cart={cart} addToCart={addToCart} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
