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
    const { searchApi } = this.props;
    event.preventDefault();
    searchApi(this.state.searchInput);
  }

  render() {
    const { searchApi } = this.props;
    return (
      <form
        onSubmit={this.onSubmitHandler}
        className="form-inline mt-3"
      >
        <input
          type="text"
          name="search"
          className="form-control"
          size="50"
          value={this.state.searchInput}
          onChange={this.onSearchInputChange}
        />
        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={() => searchApi(this.state.searchInput)}
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

export default SearchBar;
