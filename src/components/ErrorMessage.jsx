const ErrorMessage = ({ message }) => {
  return (
    <main className='min-h-screen flex items-center justify-center bg-slate-50 p-6'>
      <p className='rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-700'>{message}</p>
    </main>
  )
}

export default ErrorMessage
