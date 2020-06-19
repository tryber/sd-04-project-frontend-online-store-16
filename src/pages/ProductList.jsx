import React from 'react';
import { Link } from 'react-router-dom';

import * as api from '../services/api';
import SearchBar from '../components/SearchBar';
import CategoriesList from '../components/CategoriesList';
import { addProductToCart } from './ShoppingCart';

const ProductCard = (props) => {
  const { id, thumbnail, title, price } = props.product;
  return (
    <div data-testid="product" className="card w-25">
      <Link data-testid="product-detail-link" to={{ pathname: `/product/${id}`, state: props.product }}>
        <img className="card-img-top" height={150} src={thumbnail} alt="" />
        <div className="card-header">
          <p className="card-title">{title}</p>
        </div>
      </Link>
      <div className="card-body row justify-content-center">
        <p className="card-text text-center">R$ {Number(price).toFixed(2)}</p>
        <button
          data-testid="product-add-to-cart"
          className="btn btn-primary"
          onClick={() => addProductToCart(props.product)}
        >
          Adicionar ao carrinho
        </button>
      </div>

    </div>

  );
};

const List = (props) => {
  const { products } = props;
  return (
    <div>
      {products[0] === 'initial' && (
        <h4 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h4>)}
      {products[0] !== 'initial' && (
        <div className="row align-items-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
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
    return (
      <div className="container-fluid">
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
              <div className="col-10">
                <SearchBar
                  searchApi={this.searchApi}
                />
              </div>
              <div className="col-2">
                <Link data-testid="shopping-cart-button" to="/cart">Carrinho</Link>
              </div>
            </div>
            <List products={products} />
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
