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

  return (
    <>
      {
        data[0] && data[0].followers ?
        <div className={ showPlaylist ? "filter-container"  : "filter-container hide" }>
          <div className="filter-order">
            <p> Order By </p>
          </div>
          { genreFilters() }
        </div>
        :
        <div></div>
      }
    </>
  )
}

export default Filters
