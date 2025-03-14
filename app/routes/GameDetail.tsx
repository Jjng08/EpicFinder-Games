import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getGameDetails, getGameTrailers, getGameScreenshots } from '../services/api'
import type { Game } from '../types'

interface Trailer {
  id: number;
  name: string;
  preview: string;
  data: {
    480: string;
    max: string;
  };
}

interface Screenshot {
  id: number;
  image: string;
  width: number;
  height: number;
  is_deleted: boolean;
}

// Función para determinar si una URL es de YouTube
const isYoutubeUrl = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

// Función para convertir una URL de YouTube a su versión embebida
const getEmbedUrl = (url: string): string => {
  if (url.includes('youtube.com/watch')) {
    // Formato: https://www.youtube.com/watch?v=VIDEO_ID
    const videoId = new URL(url).searchParams.get('v');
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes('youtu.be')) {
    // Formato: https://youtu.be/VIDEO_ID
    const videoId = url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return url;
};

// Función para determinar el color del badge para Metacritic
const getMetacriticColor = (score?: number) => {
  if (!score) return 'bg-gray-400 text-white';
  if (score >= 90) return 'bg-green-700 text-white';
  if (score >= 75) return 'bg-green-600 text-white';
  if (score >= 60) return 'bg-yellow-500 text-black';
  return 'bg-red-600 text-white';
};

// Componente para mostrar iconos de plataforma
const PlatformIcon = ({ platformId }: { platformId: number }) => {
  let icon;
  
  switch (platformId) {
    case 1: // PC
      icon = (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path fill="currentColor" d="M0 13.772l6.545.902V8.426H0V13.772zM0 7.62h6.545V1.296L0 2.198V7.62zM7.265 14.8l8.735 1.2V8.425H7.265V14.8zM7.265 1.049v6.571h8.735V0L7.265 1.049z"/>
        </svg>
      );
      break;
    case 2: // PlayStation
      icon = (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M8.985 2.596v17.548l3.915 1.261v-6.393l3.399 1.016v-2.24l-3.399-1.145v-8.442l-3.915-1.605zM19.5 13.980v-3.647l-2.87-.605v2.744L19.5 13.98zM4.5 12.309l2.728 1.261V2.147L4.5 3.179v9.13z"/>
        </svg>
      );
      break;
    case 3: // Xbox
      icon = (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 0c-2.246 0-4.197.529-5.928 1.686C6.027 1.723 5.975 1.76 5.929 1.8l5.359 5.358a.754.754 0 0 0 1.063 0L17.707 1.8C16.961 1 14.515 0 12 0zM5.93 1.801l.026-.025.015-.015C2.211 4.667 0 8.125 0 12c0 1.988.506 3.861 1.404 5.5.265-.341.565-.705.886-1.093 2.532-3.04 5.684-6.822 5.684-6.822s.34-.446.432-.774c.099-.353-.066-.843-.066-.843s-2.549-3.336-3.769-4.847a8.878 8.878 0 0 0-1.148-1.22zm12.146-.025l-.004-.005C16.152.99 14.218.348 12 .348c-.371 0-.731.023-1.086.064 1.616 1.396 5.196 5.472 6.838 7.37 0 0 .119.32.053.72-.067.404-.323.733-.323.733s-3.082 3.703-5.374 6.443c-.113.127-1.305 1.473-1.305 1.473.03.026.061.053.093.079 2.814-2.103 6.367-4.451 6.367-4.451s.626-.353.729-.756c.088-.347-.128-.735-.128-.735S12.52 4.79 12.044 3.999c-.035-.062-.075-.125-.112-.188 1.984-1.346 4.177-1.953 6.144-2.035z"/>
        </svg>
      );
      break;
    case 5: // Apple
      icon = (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11"/>
        </svg>
      );
      break;
    case 7: // Nintendo
      icon = (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18 13.5v-3.8c0-.8-.6-1.3-1.3-1.3h-3.8v12.4h3.8c.7 0 1.3-.6 1.3-1.3v-6M16.9 17c0 .3-.2.5-.5.5s-.5-.2-.5-.5v-4c0-.3.2-.5.5-.5s.5.2.5.5v4M7.3 3.9h3.8v7.9H7.3c-.7 0-1.3-.6-1.3-1.3V5.2c0-.7.6-1.3 1.3-1.3m.7 6c0 .3.2.5.5.5s.5-.2.5-.5v-4c0-.3-.2-.5-.5-.5s-.5.2-.5.5zm10-6.8H6C2.7 3.2 0 5.9 0 9.2v5.5c0 3.3 2.7 6 6 6h12c3.3 0 6-2.7 6-6V9.2c0-3.3-2.7-6-6-6z"/>
        </svg>
      );
      break;
    default:
      icon = (
        <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M17.5 3a.5.5 0 00-.5.5V4h-3V3H10v1H7V3a.5.5 0 00-.5-.5H6a.5.5 0 00-.5.5v2c0 .827.673 1.5 1.5 1.5h9c.827 0 1.5-.673 1.5-1.5v-2a.5.5 0 00-.5-.5h-.5zM12 8a8 8 0 100 16 8 8 0 000-16zm0 6a2 2 0 110 4 2 2 0 010-4z"/>
        </svg>
      );
  }
  
  return (
    <span className="text-white" title={`Plataforma ${platformId}`}>
      {icon}
    </span>
  );
};

const GameDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [game, setGame] = useState<Game | null>(null)
  const [trailers, setTrailers] = useState<Trailer[]>([])
  const [activeTrailer, setActiveTrailer] = useState<Trailer | null>(null)
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]) // Nuevo estado
  const [activeScreenshot, setActiveScreenshot] = useState<Screenshot | null>(null) // Nuevo estado
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
        
        // Intenta cargar trailers primero
        try {
          const trailerData = await getGameTrailers(id)
          if (trailerData && trailerData.results && trailerData.results.length > 0) {
            setTrailers(trailerData.results)
            setActiveTrailer(trailerData.results[0])
            console.log("Trailer data:", trailerData.results[0])
          } else {
            console.log("No trailers found, loading screenshots instead")
            // Si no hay trailers, carga screenshots
            try {
              const screenshotsData = await getGameScreenshots(id)
              if (screenshotsData && screenshotsData.results && screenshotsData.results.length > 0) {
                setScreenshots(screenshotsData.results)
                setActiveScreenshot(screenshotsData.results[0])
                console.log("Screenshots data:", screenshotsData.results[0])
              }
            } catch (screenshotError) {
              console.error('Error fetching screenshots:', screenshotError)
            }
          }
        } catch (trailerError) {
          console.error('Error fetching trailers:', trailerError)
          // Si hay un error al cargar los trailers, intenta cargar screenshots
          try {
            const screenshotsData = await getGameScreenshots(id)
            if (screenshotsData && screenshotsData.results && screenshotsData.results.length > 0) {
              setScreenshots(screenshotsData.results)
              setActiveScreenshot(screenshotsData.results[0])
              console.log("Screenshots data:", screenshotsData.results[0])
            }
          } catch (screenshotError) {
            console.error('Error fetching screenshots:', screenshotError)
          }
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

  // Formatear fecha
  const formattedDate = game.released 
    ? new Date(game.released).toLocaleDateString('es-ES', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) 
    : 'Fecha no disponible';

  return (
    <div className="my-8">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Volver a la lista de juegos
        </Link>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero section with game image */}
        <div className="relative">
          {game.background_image && (
            <div className="w-full h-80 sm:h-96 relative">
              <img 
                src={game.background_image} 
                alt={game.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{game.name}</h1>
                    
                    <div className="flex flex-wrap items-center gap-3 text-white">
                      {game.released && (
                        <span className="flex items-center text-sm">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          {formattedDate}
                        </span>
                      )}
                      
                      {game.parent_platforms && game.parent_platforms.length > 0 && (
                        <div className="flex items-center gap-2">
                          {game.parent_platforms.map(p => (
                            <PlatformIcon key={p.platform.id} platformId={p.platform.id} />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-3 md:mt-0">
                    {/* Rating display */}
                    <div className="flex items-center mr-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-5 h-5 ${i < Math.round(game.rating) ? 'text-yellow-300' : 'text-gray-500'}`} 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-white font-medium">{game.rating.toFixed(1)}</span>
                    </div>
                    
                    {/* Metacritic score */}
                    {game.metacritic && (
                      <div className="flex items-center">
                        <span className={`inline-flex items-center justify-center ${getMetacriticColor(game.metacritic)} w-10 h-10 rounded-full text-sm font-bold`}>
                          {game.metacritic}
                        </span>
                        <span className="ml-1 text-white text-sm">Metacritic</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column - Game info */}
            <div className="md:col-span-2 space-y-8">
              {/* Trailer section */}
              {trailers.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Trailer</h2>
                  
                  <div className="bg-black rounded-lg overflow-hidden">
                    {activeTrailer && (
                      <div className="relative pb-[56.25%]">
                        {isYoutubeUrl(activeTrailer.data.max) ? (
                          <iframe 
                            className="absolute inset-0 w-full h-full" 
                            src={getEmbedUrl(activeTrailer.data.max)}
                            title={`Trailer de ${game.name}`}
                            name={`trailer-${game.id}`}
                            id={`trailer-${game.id}`}
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          ></iframe>
                        ) : (
                          <video 
                            className="absolute inset-0 w-full h-full object-cover" 
                            controls 
                            poster={activeTrailer.preview}
                            id={`video-${game.id}`}
                          >
                            <source src={activeTrailer.data.max} type="video/mp4" />
                            Tu navegador no soporta videos HTML5.
                          </video>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {trailers.length > 1 && (
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                      {trailers.map((trailer, index) => (
                        <div 
                          key={trailer.id || `trailer-thumb-${index}`}
                          onClick={() => setActiveTrailer(trailer)}
                          className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                            activeTrailer?.id === trailer.id ? 'border-blue-500' : 'border-transparent'
                          }`}
                        >
                          <img 
                            src={trailer.preview} 
                            alt={trailer.name || `Trailer ${index + 1}`} 
                            className="w-full h-24 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : screenshots.length > 0 ? (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Capturas de pantalla</h2>
                  
                  <div className="bg-black rounded-lg overflow-hidden">
                    {activeScreenshot && (
                      <div className="relative pb-[56.25%]">
                        <img 
                          src={activeScreenshot.image} 
                          alt={`Captura de ${game.name}`}
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                      </div>
                    )}
                  </div>
                  
                  {screenshots.length > 1 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                      {screenshots.map((screenshot, index) => (
                        <div 
                          key={screenshot.id || `screenshot-thumb-${index}`}
                          onClick={() => setActiveScreenshot(screenshot)}
                          className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                            activeScreenshot?.id === screenshot.id ? 'border-blue-500' : 'border-transparent'
                          }`}
                        >
                          <img 
                            src={screenshot.image} 
                            alt={`Captura ${index + 1}`} 
                            className="w-full h-20 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
                  <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">No hay medios disponibles</h3>
                  <p className="mt-2 text-gray-600">
                    No se encontraron trailers ni capturas de pantalla para este juego.
                  </p>
                  {game.name && (
                    <a 
                      href={`https://www.google.com/search?q=${encodeURIComponent(game.name + ' game screenshots')}&tbm=isch`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Buscar imágenes en Google
                      <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                      </svg>
                    </a>
                  )}
                </div>
              )}
              
              {/* Description */}
              {game.description_raw && (
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
                  <div className="prose max-w-none text-gray-700">
                    {game.description_raw.split('\n').map((paragraph, index) => (
                      paragraph.trim() ? <p key={index} className="mb-3">{paragraph}</p> : null
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right column - Metadata */}
            <div className="space-y-6">
              {/* Game details card */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">Detalles</h3>
                
                <div className="space-y-3">
                  {/* Platforms */}
                  {game.platforms && game.platforms.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Plataformas</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {game.platforms.map(p => (
                          <span 
                            key={p.platform.id} 
                            className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded"
                          >
                            {p.platform.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Release date */}
                  {game.released && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Fecha de lanzamiento</h4>
                      <p className="text-gray-800">{new Date(game.released).toLocaleDateString()}</p>
                    </div>
                  )}
                  
                  {/* Developers */}
                  {game.developers && game.developers.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Desarrolladores</h4>
                      <p className="text-gray-800">{game.developers.map(dev => dev.name).join(', ')}</p>
                    </div>
                  )}
                  
                  {/* Publishers */}
                  {game.publishers && game.publishers.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Publicadores</h4>
                      <p className="text-gray-800">{game.publishers.map(pub => pub.name).join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Genres & Tags */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-4 pb-2 border-b border-gray-200">Categorías</h3>
                
                {/* Genres */}
                {game.genres && game.genres.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Géneros</h4>
                    <div className="flex flex-wrap gap-2">
                      {game.genres.map(genre => (
                        <span 
                          key={genre.id} 
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Tags */}
                {game.tags && game.tags.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {game.tags.slice(0, 10).map(tag => (
                        <span 
                          key={tag.id} 
                          className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
                        >
                          {tag.name}
                        </span>
                      ))}
                      {game.tags.length > 10 && (
                        <span className="text-xs text-gray-500">
                          +{game.tags.length - 10} más
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameDetailPage
