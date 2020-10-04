import React from 'react'

function Playlist({ data, showPlaylist, getTrack }) {

  const playListView = () => {
    try {
      return data.map((item, index) => (
        <div
        key={index}
        className="playlist"
        onClick={() => getTrack(item.name)}
        >
          {
            item.images.length > 0 ?
              <img src={item.images[0].url} alt={ item.name } />
              :
              <img src="/empty-album.jpeg" alt={item.name} aria-label={item.name} />
          }
          <p> {item.name} </p>
        </div>
      )
    )
    } catch (error) {
      return error
    }
  }

  return (
    <>
      <section>
        <div className={ showPlaylist ? "playlist-container" : "playlist-container hide"}>
          { playListView() }
        </div>
      </section>
    </>
  )
}

export default Playlist
