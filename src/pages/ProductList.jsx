import React from 'react';
import * as api from '../services/api';
import SearchBar from '../components/SearchBar';
import CategoriesList from '../components/CategoriesList';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      selectedCategory: {},
      products: [],
    };
    this.onSelectedCategoryChange = this.onSelectedCategoryChange.bind(this);
    this.searchApi = this.searchApi.bind(this);
  }

  onSelectedCategoryChange(category) {
    this.setState((state) => ({ ...state, selectedCategory: category }));
    api.getProductsFromCategory(category.id)
      .then((data) => this.setState((state) => ({ ...state, products: data.results })))
  }

  searchApi(searchInput) {
    this.setState((state) => ({ ...state, searchText: searchInput }));

    if (this.state.selectedCategory.id) {
      api.getProductsFromCategoryAndQuery(this.state.selectedCategory.id, searchInput)
        .then((data) => this.setState((state) => ({ ...state, products: data.results })));
    } else {
      api.getProductsFromQuery(searchInput)
        .then((data) => this.setState((state) => ({ ...state, products: data.results })));
    }
  }

  render() {
    const { searchText, selectedCategory } = this.state;
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
            <SearchBar
              searchApi={this.searchApi}
              searchText={searchText}
              onSearchTextChange={this.onSearchTextChange}
            />
            <h4 data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
