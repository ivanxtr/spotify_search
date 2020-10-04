import React, { useState, useEffect } from "react";
import "./styles/index.styl"
import ApiController from './helpers/API'
import SearchField from './components/SearchField'
import Genres from './components/Genre'
import Playlist from './components/Playlist'
import Filters from './components/Filters'

function App() {

  const [token, setToken] = useState('')
  const [genres, setGenres] = useState([]);
  const [showGenre, setShowGenre] = useState(true) 
  const [showPlaylist, setShowPlaylist] = useState(false)
  const [playlist, setPlaylist] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filters] = useState(['popularity','followers'])
  const [filtered, setFiltered] = useState(false)

  const getGenres = async ({ token }) => {
    const genre = await ApiController.getGenres(token)
    return setGenres(genre)
  }

  const getPlaylistByGenre = async (id) => {
    const playlistData= await ApiController.getPlaylistByGenre(token, id)
    setPlaylist(playlistData)
    setShowGenre(false)
    return setShowPlaylist(true)
  }

  const search = async (value) => {
    if (value) {
      const searchResult = await ApiController.search(token, value)
      setShowGenre(false)
      setShowPlaylist(true)
      return setPlaylist(searchResult)
    }
    return false
  }

  const getTrack = async (url) => {
    const getTrack = await ApiController.getTrack(token, url)
    return getTrack
  }

  const homePage = () => {
    setShowGenre(true)
    setShowPlaylist(false)
    setSearchValue('')
    return setShowPlaylist(false)
  }

  const submitSearch = (e, value) => {
    if (e === 'Enter') {
      return search(value)
    }
    return false
  }

  const filterData = (value) => {
    let sortedPlaylist = []
    switch (value) {
      case 'followers':
        sortedPlaylist = playlist.sort((a,b) => b.followers.total - a.followers.total)
        setPlaylist(sortedPlaylist)
        return setFiltered(!filtered)
      case 'popularity':
        sortedPlaylist = playlist.sort((a,b) => b.popularity - a.popularity)
        setPlaylist(sortedPlaylist)
        return setFiltered(!filtered)
      default:
        return false
    }
  }

  useEffect(() => {
    const getToken = async () => {
      const token = await ApiController.getToken()
      setToken(token)
      getGenres({ token })
    }
    getToken()
  },[])

  return (
    <>
      <div>
        <nav>
          <div className="logo" onClick={() => homePage()}>
            <img src="/spotify-logo.png" alt="spotify brand" />
          </div>
        </nav>
        <SearchField
          search={search}
          submitSearch={submitSearch}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Filters
          showPlaylist={showPlaylist}
          data={playlist}
          filters={filters}
          filterData={filterData}
        />
        <Genres
          data={genres}
          token={token}
          getPlaylistByGenre={getPlaylistByGenre}
          showGenre={showGenre}
        />
        <Playlist
          data={playlist}
          showPlaylist={showPlaylist}
          getTrack={getTrack}
        />
        <footer>
          all rigths reserved 2020
        </footer>
      </div>
    </>
  );
}

export default App;
