import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import { favouritesReducer, getInitialFavouritesState } from '../reducers/favouritesReducer'
import ErrorMessage from './ErrorMessage'
import LoadingSpinner from './LoadingSpinner'
import PhotoCard from './PhotoCard'
import SearchBar from './SearchBar'

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos()
  const [favouritesState, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    getInitialFavouritesState,
  )
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favouritesState.favourites))
  }, [favouritesState.favourites])

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value)
  }, [])

  const toggleFavourite = useCallback((photo) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photo })
  }, [])

  const filteredPhotos = useMemo(
    () =>
      photos.filter((photo) =>
        photo.author.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [photos, searchQuery],
  )

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <main className='min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8'>
      <SearchBar value={searchQuery} onChange={handleSearch} />

      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {filteredPhotos.map((photo) => {
          const isFavourite = favouritesState.favourites.some(
            (favouritePhoto) => favouritePhoto.id === photo.id,
          )

          return (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={isFavourite}
              onToggleFavourite={toggleFavourite}
            />
          )
        })}
      </div>
    </main>
  )
}

export default Gallery
