import React, { useState, useEffect } from 'react'
import { getGames } from '../services/api'
import GameCard from '../components/GameCard'
import Filters from '../components/Filters'
import SearchBar from '../components/SearchBar'
import type { FiltersType, Game } from '../types'

const HomePage: React.FC = () => {
  // Estado para la lista actual de juegos
  const [games, setGames] = useState<Game[]>([])
  
  // Estado para los filtros
  const [filters, setFilters] = useState<FiltersType>({
    year: '',
    genre: '',
    platform: '',
    tag: '',
    developer: ''
  })
  
  // Estados para búsqueda y paginación
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const pageSize = 20
  
  // Función para obtener juegos con los parámetros actuales
  const fetchGames = async () => {
    setIsLoading(true)
    try {
      // Pasamos todos los filtros a la API
      const data = await getGames(searchQuery, page, pageSize, filters);
      setGames(data.results || [])
      
      // Calculamos el número total de páginas
      const total = Math.ceil((data.count || 0) / pageSize)
      setTotalPages(total)
    } catch (error) {
      console.error('Error fetching games:', error)
      setGames([])
      setTotalPages(0)
    } finally {
      setIsLoading(false)
    }
  }
  
  // Efecto para obtener juegos cuando cambian los parámetros relevantes
  useEffect(() => {
    fetchGames()
  }, [page, searchQuery, filters]) // Observamos todos los filtros
  
  // Manejador para cambios en la búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPage(1) // Volver a la página 1 al buscar
  }
  
  // Manejadores para la paginación
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }
  
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6">Explora Videojuegos</h1>
      
      {/* Pasamos el nuevo handler a SearchBar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearch} />
      <Filters filters={filters} setFilters={setFilters} />
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {games.length > 0 ? (
              games.map(game => (
                <GameCard key={game.id} game={game} />
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 bg-gray-100 rounded-lg">
                <p className="text-lg text-gray-600">No se encontraron juegos con los criterios especificados.</p>
                <p className="mt-2 text-gray-500">Intenta con diferentes filtros o términos de búsqueda.</p>
              </div>
            )}
          </div>
          
          {games.length > 0 && (
            <div className="flex justify-between items-center my-8">
              <button 
                onClick={handlePreviousPage} 
                disabled={page <= 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Anterior
              </button>
              <span className="text-gray-700">Página {page} de {totalPages}</span>
              <button 
                onClick={handleNextPage} 
                disabled={page >= totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
