import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getGameDetails, getGameTrailers } from '../services/api'
import type { Game, Trailer } from '../types'

const GameDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [game, setGame] = useState<Game | null>(null)
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGameDetail = async () => {
      try {
        setLoading(true);
        if (!id) {
          setError('ID de juego no válido');
          return;
        }
        
        const gameData = await getGameDetails(id)
        setGame(gameData)
        
        try {
          const trailerData = await getGameTrailers(id)
          if (trailerData && trailerData.results) {
            setTrailers(trailerData.results)
          }
        } catch (trailerError) {
          console.error('Error fetching trailers:', trailerError)
          // No establecemos error general porque los trailers son opcionales
        }
      } catch (error) {
        console.error('Error fetching game detail:', error)
        setError('No se pudo cargar la información del juego')
      } finally {
        setLoading(false)
      }
    }
    
    fetchGameDetail()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !game) {
    return (
      <div className="text-center my-8">
        <p className="text-red-500 text-xl">{error || 'No se pudo cargar el juego'}</p>
        <Link to="/" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Volver a la página principal
        </Link>
      </div>
    )
  }

  return (
    <div className="my-8">
      <div className="mb-4">
        <Link to="/" className="text-blue-500 hover:underline flex items-center">
          ← Volver a la lista de juegos
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
        
        {game.background_image && (
          <img 
            src={game.background_image} 
            alt={game.name} 
            className="w-full max-h-96 object-cover rounded-lg mb-6" 
          />
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Detalles</h2>
            <div className="space-y-2">
              {game.released && (
                <p><span className="font-medium">Fecha de lanzamiento:</span> {new Date(game.released).toLocaleDateString()}</p>
              )}
              {game.metacritic && (
                <p><span className="font-medium">Puntuación Metacritic:</span> <span className={`px-2 py-1 rounded ${game.metacritic > 75 ? 'bg-green-100 text-green-800' : game.metacritic > 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{game.metacritic}</span></p>
              )}
              {game.developers && game.developers.length > 0 && (
                <p>
                  <span className="font-medium">Desarrolladores:</span> {game.developers.map(dev => dev.name).join(', ')}
                </p>
              )}
              {game.publishers && game.publishers.length > 0 && (
                <p>
                  <span className="font-medium">Publicadores:</span> {game.publishers.map(pub => pub.name).join(', ')}
                </p>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Plataformas y Géneros</h2>
            <div className="space-y-2">
              {game.platforms && game.platforms.length > 0 && (
                <p>
                  <span className="font-medium">Plataformas:</span> {game.platforms.map(p => p.platform.name).join(', ')}
                </p>
              )}
              {game.genres && game.genres.length > 0 && (
                <p>
                  <span className="font-medium">Géneros:</span> {game.genres.map(genre => genre.name).join(', ')}
                </p>
              )}
              {game.tags && game.tags.length > 0 && (
                <p>
                  <span className="font-medium">Tags:</span> {game.tags.slice(0, 5).map(tag => tag.name).join(', ')}
                  {game.tags.length > 5 && '...'}
                </p>
              )}
            </div>
          </div>
        </div>
        
        {game.description_raw && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Descripción</h2>
            <div className="prose max-w-none">
              {game.description_raw.split('\n').map((paragraph, index) => (
                paragraph.trim() ? <p key={index} className="mb-3">{paragraph}</p> : null
              ))}
            </div>
          </div>
        )}
        
        {trailers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Trailers y Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trailers.map((trailer) => (
                <div key={trailer.id} className="border rounded overflow-hidden">
                  <h3 className="p-2 bg-gray-100 font-medium">{trailer.name}</h3>
                  <div className="p-4 flex justify-center">
                    <a 
                      href={trailer.data.max} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Ver Trailer
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GameDetailPage
