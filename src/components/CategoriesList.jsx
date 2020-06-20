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
    const { categories } = this.state;
    const { selectedCategory, onSelectCategory, resetSelectedCategory } = this.props;
    return (
      <div className="card">
        <div className="card-header">
          <h4 className="text-center">Categorias</h4>
        </div>
        <div className="list-group list-group-flush">
          {selectedCategory.id && (<li className="list-group-item disabled text-center">Categoria selecionada</li>)}
          {categories.filter((category) => category.id === selectedCategory.id).map((category) => (
            <button
              data-testid="category"
              key={category.id}
              type="button"
              onClick={() => resetSelectedCategory(category)}
              className="list-group-item list-group-item-action active"
            >
              {category.name}
            </button>
          ))}
          <li className="list-group-item disabled text-center">Todas categorias</li>

          {categories.filter((category) => category.id !== selectedCategory.id).map((category) => (
            <button
              data-testid="category"
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category)}
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
