import React from 'react'

const Filters = ({ showPlaylist, data, filterData, filters }) => {

  const genreFilters = () => {
    return filters.map((filter, index) => (
      <button 
      onClick={() => filterData(filter)}
      key={index}> 
        {filter} 
      </button>
    ))
  }

  const showMenu = () => {
    return data && data[0] && data[0].followers
  }

  return (
    <>
        <div className={ showPlaylist && showMenu() ? "filter-container"  : "filter-container hide" }>
          <div className="filter-order">
            <p> Order By </p>
          </div>
          { filters ? genreFilters() : false }
        </div>
    </>
  )
}

export default Filters
