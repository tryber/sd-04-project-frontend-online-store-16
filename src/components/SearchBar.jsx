import React from 'react';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { searchInput: '' };
    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSearchInputChange(event) {
    this.setState({ searchInput: event.target.value });
  }

  onSubmitHandler(event) {
    const { searchInput } = this.state;
    const { searchApi } = this.props;
    event.preventDefault();
    searchApi(searchInput);
  }

  render() {
    const { searchInput } = this.state;
    const { searchApi } = this.props;
    return (
      <form
        onSubmit={this.onSubmitHandler}
        className="form-inline"
      >
        <input
          type="text"
          name="search"
          className="form-control"
          size="50"
          value={searchInput}
          onChange={this.onSearchInputChange}
          data-testid="query-input"
        />
        <button
          type="button"
          className="btn btn-primary mx-1"
          data-testid="query-button"
          onClick={() => searchApi(searchInput)}
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

export default SearchBar;
