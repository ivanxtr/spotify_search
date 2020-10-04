import React from 'react'

function Genre({
  data,
  getPlaylistByGenre,
  showGenre
}) {

  const genreView = () => {
    return data.map((item, index) => (
        <div
        key={index}
          className="genre"
          onClick={() => getPlaylistByGenre(item.id)}
        >
          <p>{ item.name }</p>
          <img src={item.icons[0].url} alt={ item.name } />
        </div>
      )
    )
  }

  return (
    <>
     <section>
      <div className={showGenre ? "genre-container" : "genre-container hide"}>
        { genreView() }
      </div>
     </section>
    </>
  )
}

export default Genre
