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
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false)
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
  }, [page, searchQuery, filters])
  
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

  // Toggle para los filtros en móvil
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="py-6">
      <h1 className="text-3xl font-bold mb-6">Explora Videojuegos</h1>
      <p className='mb-2 text-gray-700 '>Busca tu proximo juego, filtrando por Año, Genero, etc...</p>
      
      {/* Botón de filtros para móvil */}
      <button
        onClick={toggleMobileFilters}
        className="md:hidden w-full mb-4 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm4 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
        </svg>
        <span>{showMobileFilters ? 'Ocultar filtros' : 'Mostrar filtros'}</span>
      </button>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Contenido principal (Juegos) */}
        <div className="flex-1 order-2 md:order-1">
          {/* Resumen de resultados y filtros activos - visible solo cuando hay filtros */}
          {(filters.year || filters.genre || filters.platform || filters.tag || filters.developer || searchQuery) && (
            <div className="badge p-3 rounded-lg mb-4 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">Filtros aplicados:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center badge text-xs font-medium px-2.5 py-1 rounded-full">
                  Búsqueda: {searchQuery}
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="ml-1.5 hover:text-opacity-70"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </span>
              )}
              
              {filters.year && (
                <span className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  Año: {filters.year}
                </span>
              )}
              
              {filters.genre && (
                <span className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  Género: {filters.genre}
                </span>
              )}
              
              {filters.platform && (
                <span className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  Plataforma: {filters.platform}
                </span>
              )}
              
              {filters.tag && (
                <span className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  Tag: {filters.tag}
                </span>
              )}
              
              {filters.developer && (
                <span className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-1 rounded-full">
                  Desarrollador: {filters.developer}
                </span>
              )}
            </div>
          )}
          
          {isLoading ? (
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 my-4">
                {games.length > 0 ? (
                  games.map(game => (
                    <GameCard key={game.id} game={game} />
                  ))
                ) : (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 card rounded-lg">
                    <p className="text-lg">No se encontraron juegos con los criterios especificados.</p>
                    <p className="mt-2">Intenta con diferentes filtros o términos de búsqueda.</p>
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
        
        {/* Sidebar con búsqueda y filtros */}
        <aside className={`w-full md:w-72 lg:w-80 order-1 md:order-2 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
          <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
            {/* Contenedor unificado con cuadro redondeado */}
            <div className="sidebar rounded-lg p-5">
              {/* Sección de búsqueda */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar
                </h2>
                <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearch} />
              </div>
              
              {/* Divisor */}
              <div className="border-b border-gray-200 dark:border-gray-700 my-4"></div>
              
              {/* Sección de filtros */}
              <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 010 2H4a1 1 0 01-1-1zm3 6a1 1 0 011-1h10a1 1 0 010 2H7a1 1 0 01-1-1zm4 6a1 1 0 011-1h4a1 1 0 010 2h-4a1 1 0 01-1-1z" />
                  </svg>
                  Filtros
                </h2>
                <Filters filters={filters} setFilters={setFilters} sidebarMode={true} />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomePage;
