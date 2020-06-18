import React from 'react';
import * as api from '../services/api';

// Preciso receber como props algo pra manipular o state de array de elementos
// e o estado do termo de busca
class CategoriesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }

  componentDidMount() {
    api.getCategories().then((categories) => this.setState((state) => ({ ...state, categories })));
  }

  render() {
    return (
      <div className="card mt-3">
        <div className="list-group">
          {this.state.categories
            .filter((category) => category.id === this.props.selectedCategory.id)
            .map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => this.props.onSelectCategory(category)}
                className="list-group-item list-group-item-action active mb-1"
              >
                {category.name}
              </button>
            ))}
          {this.state.categories
            .filter((category) => category.id !== this.props.selectedCategory.id)
            .map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => this.props.onSelectCategory(category)}
                className="list-group-item list-group-item-action"
              >
                {category.name}
              </button>
            ))}
        </div>
      </div>
    );
  }
}

export default CategoriesList;
