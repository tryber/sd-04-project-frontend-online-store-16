import React from 'react';
// import * as api from '../services/api';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      // products: '',
    };
    this.onSearchTextChange = this.onSearchTextChange.bind(this);
    this.searchApi = this.searchApi.bind(this);
  }

  onSearchTextChange(event) {
    this.setState({ searchText: event.target.value });
  }

  // searchApi() {
  //   const { searchText } = this.state;
  //   api.getProductsFromQuery(searchText).then((data) => this.setState({products: data.results}));
  // }

  render() {
    const { searchText } = this.state;
    // data não esta sendo usado ainda pois precisa criar o card dos produtos
    return (
      <div>
        <SearchBar
          searchApi={this.searchApi}
          searchText={searchText}
          onSearchTextChange={this.onSearchTextChange}
        />
        <div>
          <Link to="/cart" data-testid="shopping-cart-button">Carrinho</Link>
          <h4 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h4>
        </div>
      </div>
    );
  }
}

export default ProductList;
