import React from 'react';
import { Link } from 'react-router-dom';

import * as api from '../services/api';
import SearchBar from '../components/SearchBar';
import CategoriesList from '../components/CategoriesList';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: {},
      products: [],
    };
    this.onSelectedCategoryChange = this.onSelectedCategoryChange.bind(this);
    this.searchApi = this.searchApi.bind(this);
  }

  onSelectedCategoryChange(category) {
    this.setState((state) => ({ ...state, selectedCategory: category }));
    api.getProductsFromCategory(category.id)
      .then((data) => this.setState((state) => ({ ...state, products: data.results })));
  }

  searchApi(searchInput) {
    if (this.state.selectedCategory.id) {
      api.getProductsFromCategoryAndQuery(this.state.selectedCategory.id, searchInput)
        .then((data) => this.setState((state) => ({ ...state, products: data.results })));
    } else {
      api.getProductsFromQuery(searchInput)
        .then((data) => this.setState((state) => ({ ...state, products: data.results })));
    }
  }

  render() {
    const { selectedCategory, products } = this.state;
    // data não esta sendo usado ainda pois precisa criar o card dos produtos
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <CategoriesList
              selectedCategory={selectedCategory}
              onSelectCategory={this.onSelectedCategoryChange}
            />
          </div>
          <div className="col-9">
            <div className="row align-items-center">
              <SearchBar
                searchApi={this.searchApi}
              />
              <Link to="/cart">Carrinho</Link>
            </div>
            {!products.length && (
              <h4 data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </h4>)}

            <div className="row align-items-center">
              {products.map(product => (
                <Link to={`/product/${product.id}`} key={product.id} className="card w-25">
                  <img className="card-img-top"  height={150} src={product.thumbnail} alt="" />
                  <div className="card-header">
                    <p className="card-title">{product.title}</p>
                  </div>
                  <div className="card-body">
                    <p className="card-text">R$ {Number(product.price).toFixed(2)}</p>
                  </div>
                  <div className="card-body">
                    <button className="btn btn-primary">Adicionar ao carrinho</button>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
