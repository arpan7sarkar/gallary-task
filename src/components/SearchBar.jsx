const SearchBar = ({ value, onChange }) => {
  return (
    <div className='mx-auto mb-4 max-w-7xl'>
      <label htmlFor='author-search' className='mb-2 block text-sm font-medium text-slate-700'>
        Search by author
      </label>
      <input
        id='author-search'
        type='text'
        value={value}
        onChange={onChange}
        placeholder='Type an author name...'
        className='w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm outline-none focus:border-slate-500'
      />
    </div>
  )
}

export default SearchBar
