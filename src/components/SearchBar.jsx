import React from 'react';

class SearchBar extends React.Component {
  render() {
    const { searchApi, searchText, onSearchTextChange } = this.props;
    return (
      <div>
        <input type="text" name="search" size="50" value={searchText} onChange={onSearchTextChange} />
        <button type="button" onClick={() => searchApi()}>Pesquisar</button>
      </div>
    );
  }
}

export default SearchBar;
