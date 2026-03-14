import { useEffect, useState } from 'react'

const useFetchPhotos = () => {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('https://picsum.photos/v2/list?limit=30&&page=2')

        if (!response.ok) {
          throw new Error(`Failed to fetch photos. Status: ${response.status}`)
        }

        const data = await response.json()
        setPhotos(data)
      } catch (fetchError) {
        setError(fetchError.message || 'Something went wrong while fetching photos.')
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()
  }, [])

  return { photos, loading, error }
}

export default useFetchPhotos
