import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';

import * as api from '../services/api';
import SearchBar from '../components/SearchBar';
import CategoriesList from '../components/CategoriesList';
import FilterList from '../components/FilterList';

import './ProductList.css';

const ProductCard = (props) => {
  const { id, thumbnail, title, price } = props.product;
  const isInCart = props.cart.some((cartProduct) => cartProduct.id === id);
  return (
    <div className="col-4 mb-4">
      <div data-testid="product" className={`card ${isInCart ? 'bg-success text-white' : ''}`}>
        <Link
          className={`${isInCart ? 'text-white' : ''}`}
          data-testid="product-detail-link"
          to={{ pathname: `/product/${id}`, state: props.product }}
        >
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

const HeaderMenu = (props) => {
  const { totalCart, searchApi, products, filterProducts } = props;
  return (
    <div>
      <div className="row align-items-center">
        <div className="col pr-0">
          <SearchBar searchApi={searchApi} />
        </div>
        <div className="col-2 pl-0">
          <Link
            className="d-flex align-items-center"
            data-testid="shopping-cart-button"
            to="/cart"
          >
            <FaShoppingCart className="mr-1" size={32} />
            {totalCart} {totalCart === 1 ? 'item' : 'itens'}
          </Link>
        </div>
      </div>
      <div className="row">
        <FilterList products={products} filterProducts={filterProducts} />
      </div>
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

  onSelectedCategoryChange(category) {
    this.setState((state) => ({ ...state, selectedCategory: category }));
    api.getProductsFromCategoryAndQuery(category.id, '')
      .then((data) => this.setState((state) => ({ ...state, products: data.results })));
  }

  filterProducts(products) {
    this.setState((state) => ({ ...state, products }));
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
            <HeaderMenu
              products={products}
              totalCart={totalCart}
              searchApi={this.searchApi}
              filterProducts={this.filterProducts}
            />
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
