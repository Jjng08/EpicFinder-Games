import React, { useState, useEffect } from 'react'
import { getGames } from '../services/api'
import GameCard from '../components/GameCard'
import Filters from '../components/Filters'
import SearchBar from '../components/SearchBar'
import type { FiltersType, Game } from '../types'
import { 
  Pagination, 
  PaginationPrevious, 
  PaginationNext,
  PaginationList,
  PaginationPage,
  PaginationGap
} from '../components/Pagination';

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

  // Función para generar los elementos de paginación
  const generatePaginationItems = () => {
    const items = [];
    
    // Siempre mostrar la primera página
    items.push(
      <PaginationPage 
        key="page-1" 
        page={1} 
        current={page === 1} 
        onClick={() => setPage(1)}
      />
    );
    
    // Si estamos más allá de la página 3, mostrar puntos suspensivos después de la página 1
    if (page > 3) {
      items.push(<PaginationGap key="gap-1" />);
    }
    
    // Páginas alrededor de la página actual
    const startPage = Math.max(2, page - 1);
    const endPage = Math.min(totalPages - 1, page + 1);
    
    for (let i = startPage; i <= endPage; i++) {
      if (i <= 1 || i >= totalPages) continue;
      
      items.push(
        <PaginationPage 
          key={`page-${i}`} 
          page={i} 
          current={page === i} 
          onClick={() => setPage(i)}
        />
      );
    }
    
    // Si no estamos cerca de la última página, mostrar puntos suspensivos
    if (page < totalPages - 2) {
      items.push(<PaginationGap key="gap-2" />);
    }
    
    // Siempre mostrar la última página si hay más de una página
    if (totalPages > 1) {
      items.push(
        <PaginationPage 
          key={`page-${totalPages}`} 
          page={totalPages} 
          current={page === totalPages} 
          onClick={() => setPage(totalPages)}
        />
      );
    }
    
    return items;
  };

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
            <div className="flex flex-col items-center my-8">
              {/* Texto informativo */}
              <span className="text-sm text-gray-700 mb-3">
                Mostrando <span className="font-semibold text-gray-900">{(page - 1) * pageSize + 1}</span> a{" "}
                <span className="font-semibold text-gray-900">
                  {Math.min(page * pageSize, (totalPages * pageSize))}
                </span>{" "}
                de <span className="font-semibold text-gray-900">{totalPages * pageSize}</span> juegos
              </span>
              
              {/* Sistema de paginación mejorado */}
              <Pagination>
                <PaginationPrevious onClick={handlePreviousPage} disabled={page <= 1} />
                <PaginationList>
                  {generatePaginationItems()}
                </PaginationList>
                <PaginationNext onClick={handleNextPage} disabled={page >= totalPages} />
              </Pagination>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default HomePage;
