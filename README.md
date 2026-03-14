# Gallery Task

A responsive photo gallery built with React and Vite.
It fetches photos from the Picsum API, supports searching by author name, and lets users mark photos as favourites with persistence in localStorage.

## Project Overview

This project demonstrates a clean React architecture using:

- Component-based UI
- Custom hooks for data fetching
- Reducer-based state management for favourites
- Performance-focused React hooks for memoization and stable callbacks

## Features

- Fetches photo data from the Picsum API
- Search photos by author name
- Add or remove favourites
- Persist favourites in localStorage
- Loading and error handling states
- Responsive card grid layout

## Tech Stack

- React 19
- Vite 8
- Tailwind CSS 4
- ESLint

## Github Repository

https://github.com/arpan7sarkar/gallery-task

## Optimization Hooks Used

The app uses React hooks not only for state and side effects, but also for optimization.

### 1) useMemo

- Used for: memoizing filtered photo results
- Where: in `Gallery` while deriving `filteredPhotos`
- Why: avoids recalculating the filter logic on every render when `photos` and `searchQuery` have not changed
- Benefit: reduces unnecessary computation, especially useful as data size grows

### 2) useCallback

- Used for: memoizing event handlers
- Where:
	- `handleSearch`
	- `toggleFavourite`
- Why: keeps stable function references across renders
- Benefit: helps prevent avoidable re-renders in child components receiving these handlers as props

### 3) useReducer

- Used for: managing favourites state transitions
- Where: `favouritesReducer` + `dispatch` in `Gallery`
- Why: reducer pattern keeps complex update logic centralized and predictable
- Benefit: cleaner state updates and easier scaling compared to multiple independent `useState` updates

### 4) useEffect

- Used for:
	- Fetching photos inside custom hook `useFetchPhotos` (runs once on mount)
	- Syncing favourites to localStorage when favourites change
- Why: isolates side effects from rendering logic
- Benefit: keeps UI logic pure and ensures persistence/fetching runs at the correct lifecycle moments

### 5) Lazy initialization with useReducer

- Used for: loading initial favourites from localStorage only once
- Where: `getInitialFavouritesState` passed as lazy initializer to `useReducer`
- Why: prevents reading/parsing localStorage on every render
- Benefit: improves startup and render efficiency

## Project Structure

```
src/
	App.jsx
	main.jsx
	index.css
	components/
		Gallery.jsx
		SearchBar.jsx
		PhotoCard.jsx
		LoadingSpinner.jsx
		ErrorMessage.jsx
	hooks/
		useFetchPhotos.js
	reducers/
		favouritesReducer.js
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Start development server

```bash
npm run dev
```

### 3) Build for production

```bash
npm run build
```

### 4) Preview production build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint checks

## API

- Photo source: `https://picsum.photos/v2/list?limit=30&&page=2`

## Notes

- Favourites are persisted in browser localStorage under the key `favourites`.
- If data fetching fails, a clear error UI is shown.
