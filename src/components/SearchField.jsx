import React from 'react'

function SearchField({ search, submitSearch, searchValue, setSearchValue }) {

  return(
    <>
    <div className="search-container" onKeyPress={(e) => submitSearch(e.key, searchValue)}>
      <input
          className="searchField"
          placeholder="Type your search"
          value={searchValue}
          type="search"
          onChange={(e) => setSearchValue(e.target.value)} 
      />
      <button onClick={() => search(searchValue)}>
        <span> Search on Spotify </span>
      </button>
    </div>
    </>
  )
}

export default SearchField
