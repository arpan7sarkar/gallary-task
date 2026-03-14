const FavouriteIcon = ({ isFavourite }) => {
  if (isFavourite) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        fill='currentColor'
        className='h-5 w-5 text-rose-500'
        aria-hidden='true'
      >
        <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.03 6.03 0 0116.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
      </svg>
    )
  }

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.8'
      className='h-5 w-5 text-slate-400'
      aria-hidden='true'
    >
      <path d='M12.1 21.35l-1.1-1C5.14 15.24 2 12.39 2 8.85 2 5.97 4.24 3.75 7.07 3.75c1.6 0 3.13.74 4.03 1.92a5.13 5.13 0 014.03-1.92c2.83 0 5.07 2.22 5.07 5.1 0 3.54-3.14 6.39-8.99 11.5l-1.11 1z' />
    </svg>
  )
}

const PhotoCard = ({ photo, isFavourite, onToggleFavourite }) => {
  return (
    <article className='overflow-hidden rounded-xl bg-white shadow-sm'>
      <img src={photo.download_url} alt={photo.author} className='h-56 w-full object-cover' />

      <div className='flex items-center justify-between gap-3 p-3'>
        <p className='truncate text-sm font-medium text-slate-700'>{photo.author}</p>
        <button
          type='button'
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          onClick={() => onToggleFavourite(photo)}
          className='inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-slate-300 bg-white shadow-sm transition hover:scale-110 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400'
        >
          <FavouriteIcon isFavourite={isFavourite} />
        </button>
      </div>
    </article>
  )
}

export default PhotoCard
