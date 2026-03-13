import  { useState , useEffect } from 'react'

const App = () => {

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('https://picsum.photos/v2/list')
        const data = await response.json()
        setPhotos(data)
        setLoading(false)
      } catch (error) {
        setError(error.message)
        setLoading(false)
      }
    }
    fetchPhotos()
  }, [])
  return (
    <div className='grid grid-cols-3 gap-4'>
      {photos.map((photo) => (
        <div key={photo.id} className='bg-white p-4 rounded'>
          <img src={photo.download_url} alt={photo.author} className='w-full h-auto' />
        </div>
      ))}
    </div>
  )
}

export default App