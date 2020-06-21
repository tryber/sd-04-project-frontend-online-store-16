import React from 'react';
import * as api from '../services/api';

const AllCategories = (props) => {
  const { categories, selectedCategory, onSelectCategory } = props;
  return (
    <div>
      <li className="list-group-item disabled text-center">
        Todas categorias
      </li>
      {categories
        .filter((category) => category.id !== selectedCategory.id)
        .map((category) => (
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
  )
}

const SelectedCategory = (props) => {
  const { categories, selectedCategory, resetSelectedCategory } = props;
  return (
    <div>
      {selectedCategory.id && (
        <li className="list-group-item disabled text-center">
          Categoria selecionada
          <p className="mb-0">
            <small>Clique sobre ela para deselecionar</small>
          </p>
        </li>
      )}
      {categories
        .filter((category) => category.id === selectedCategory.id)
        .map((category) => (
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
    </div>
  )
}

const Categories = (props) => {
  const { selectedCategory, onSelectCategory, resetSelectedCategory, categories } = props;
  return (
    <div className="list-group list-group-flush">
      <SelectedCategory
        categories={categories}
        selectedCategory={selectedCategory}
        resetSelectedCategory={resetSelectedCategory}
      />
      <AllCategories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
    </div>
  )
}

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
        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
          resetSelectedCategory={resetSelectedCategory}
        />
      </div>
    );
  }
}

export default CategoriesList;
