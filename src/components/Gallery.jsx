import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'

const favouritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const exists = state.favourites.some((photo) => photo.id === action.payload.id)
      const updatedFavourites = exists
        ? state.favourites.filter((photo) => photo.id !== action.payload.id)
        : [...state.favourites, action.payload]

      return { ...state, favourites: updatedFavourites }
    }
    default:
      return state
  }
}

const getInitialFavouritesState = () => {
  try {
    const stored = localStorage.getItem('favourites')
    return { favourites: stored ? JSON.parse(stored) : [] }
  } catch {
    return { favourites: [] }
  }
}

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

  const toggleFavourite = (photo) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photo })
  }

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value)
  }, [])

  const filteredPhotos = useMemo(
    () =>
      photos.filter((photo) =>
        photo.author.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [photos, searchQuery],
  )

  if (loading) {
    return (
      <main className='min-h-screen flex items-center justify-center bg-slate-50 p-6'>
        <div
          className='h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-slate-700'
          role='status'
          aria-label='Loading photos'
        />
      </main>
    )
  }

  if (error) {
    return (
      <main className='min-h-screen flex items-center justify-center bg-slate-50 p-6'>
        <p className='rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-700'>
          {error}
        </p>
      </main>
    )
  }

  return (
    <main className='min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8'>
      <div className='mx-auto mb-4 max-w-7xl'>
        <label htmlFor='author-search' className='mb-2 block text-sm font-medium text-slate-700'>
          Search by author
        </label>
        <input
          id='author-search'
          type='text'
          value={searchQuery}
          onChange={handleSearch}
          placeholder='Type an author name...'
          className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none focus:border-slate-500'
        />
      </div>

      <div className='mx-auto max-w-7xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {filteredPhotos.map((photo) => {
          const isFavourite = favouritesState.favourites.some(
            (favouritePhoto) => favouritePhoto.id === photo.id,
          )

          return (
            <article key={photo.id} className='overflow-hidden rounded-xl bg-white shadow-sm'>
              <img
                src={photo.download_url}
                alt={photo.author}
                className='h-56 w-full object-cover'
              />
              <div className='flex items-center justify-between gap-3 p-3'>
                <p className='truncate text-sm font-medium text-slate-700'>{photo.author}</p>
                <button
                  type='button'
                  aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
                  onClick={() => toggleFavourite(photo)}
                  className='text-2xl leading-none text-slate-500 transition hover:scale-110'
                >
                  {isFavourite ? (
                    <span className='text-rose-500'>♥</span>
                  ) : (
                    <span className='text-slate-400'>♡</span>
                  )}
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </main>
  )
}

export default Gallery
