import { useEffect, useState } from 'react'

const App = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favourites, setFavourites] = useState([])

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('https://picsum.photos/v2/list?limit=30')

        if (!response.ok) {
          throw new Error(`Failed to fetch photos. Status: ${response.status}`)
        }

        const data = await response.json()
        setPhotos(data)
      } catch (error) {
        setError(error.message || 'Something went wrong while fetching photos.')
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  const toggleFavourite = (id) => {
    setFavourites((prevFavourites) =>
      prevFavourites.includes(id)
        ? prevFavourites.filter((favouriteId) => favouriteId !== id)
        : [...prevFavourites, id],
    )
  }

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
      <div className='mx-auto max-w-7xl grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {photos.map((photo) => {
          const isFavourite = favourites.includes(photo.id)

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
                  onClick={() => toggleFavourite(photo.id)}
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

export default App
