const LoadingSpinner = () => {
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

export default LoadingSpinner
