export const favouritesReducer = (state, action) => {
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

export const getInitialFavouritesState = () => {
  try {
    const stored = localStorage.getItem('favourites')
    return { favourites: stored ? JSON.parse(stored) : [] }
  } catch {
    return { favourites: [] }
  }
}
