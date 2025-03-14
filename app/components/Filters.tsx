import React, { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import type { FiltersType } from '../types';
import DeveloperSearch from './DeveloperSelector';

// Definimos opciones para los selectores
const platformOptions = [
  { id: '', name: 'Todas las plataformas' },
  { id: '4', name: 'PC' },
  { id: '187', name: 'PlayStation 5' },
  { id: '18', name: 'PlayStation 4' },
  { id: '1', name: 'Xbox One' },
  { id: '186', name: 'Xbox Series S/X' },
  { id: '7', name: 'Nintendo Switch' },
  { id: '3', name: 'iOS' },
  { id: '21', name: 'Android' },
  { id: '83', name: 'Nintendo 64' },
  { id: '24', name: 'Game Boy Advance' },
];

const genreOptions = [
  { id: '', name: 'Todos los géneros' },
  { id: '4', name: 'Action' },
  { id: '51', name: 'Indie' },
  { id: '3', name: 'Adventure' },
  { id: '5', name: 'RPG' },
  { id: '10', name: 'Strategy' },
  { id: '2', name: 'Shooter' },
  { id: '40', name: 'Casual' },
  { id: '14', name: 'Simulation' },
  { id: '7', name: 'Puzzle' },
  { id: '11', name: 'Arcade' },
  { id: '83', name: 'Platformer' },
  { id: '1', name: 'Racing' },
  { id: '15', name: 'Sports' },
  { id: '59', name: 'Massively Multiplayer' },
  { id: '6', name: 'Fighting' },
{ id: '19', name: 'Family' },
  { id: '28', name: 'Board Games' },
  { id: '34', name: 'Educational' },
  { id: '17', name: 'Card' },
];

// Opciones para tags populares
const tagOptions = [
  { id: '', name: 'Todos los tags' },
  { id: '31', name: 'Singleplayer' },
  { id: '7', name: 'Multiplayer' },
  { id: '32', name: 'Atmospheric' },
  { id: '40847', name: 'Steam Achievements' },
  { id: '40849', name: 'Steam Cloud' },
  { id: '13', name: 'Atmospheric' },
  { id: '42', name: 'Great Soundtrack' },
  { id: '24', name: 'RPG' },
  { id: '18', name: 'Co-op' },
  { id: '36', name: 'Open World' },
  { id: '8', name: 'First-Person' },
  { id: '149', name: 'Third Person' },
  { id: '4', name: 'Funny' },
  { id: '49', name: 'Difficult' },
  { id: '26', name: 'Gore' },
  { id: '193', name: 'Classic' },
  { id: '75', name: 'Hack and Slash' },
  { id: '197', name: 'Cats' },
  { id: '15', name: '2D' },
  { id: '131', name: '3D' },
];

const yearOptions = [
  { id: '', name: 'Todos los años' },
  ...Array.from({ length: 26 }, (_, i) => {
    const year = 2025 - i;
    return { id: year.toString(), name: year.toString() };
  })
];

interface FiltersProps {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  sidebarMode?: boolean; // Nueva prop para modo sidebar
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, sidebarMode = false }) => {
  const [localFilters, setLocalFilters] = useState<FiltersType>(filters);
  const [isExpanded, setIsExpanded] = useState(sidebarMode); // Si está en sidebar, siempre expandido
  
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDeveloperChange = (developerSlug: string) => {
    setLocalFilters(prev => ({
      ...prev,
      developer: developerSlug
    }));
  };

  // Aplicar filtros después de un breve retraso para no hacer demasiadas solicitudes
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(localFilters);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [localFilters, setFilters]);

  // Sincronizar localFilters cuando cambian los filters desde fuera
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  return (
    <div className={sidebarMode ? "" : "bg-white shadow-md rounded-lg p-4 my-6"}>
      {!sidebarMode && (
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center bg-rose-400 hover:bg-rose-600 text-white text-sm font-medium focus:outline-none"
          >
            {isExpanded ? 'Mostrar menos' : 'Mostrar más'}
            <svg
              className={`ml-1 w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      )}

      {/* En modo sidebar, muestra los filtros en una columna */}
      <div className={`${sidebarMode ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-3 gap-4'}`}>
        {/* Selector de plataforma */}
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">
            Plataforma
          </label>
          <select
            id="platform"
            name="platform"
            value={localFilters.platform}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          >
            {platformOptions.map(option => (
              <option key={`platform-${option.id}`} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de género */}
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
            Género
          </label>
          <select
            id="genre"
            name="genre"
            value={localFilters.genre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          >
            {genreOptions.map(option => (
              <option key={`genre-${option.id}`} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selector de año */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
            Año de lanzamiento
          </label>
          <select
            id="year"
            name="year"
            value={localFilters.year}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
          >
            {yearOptions.map(option => (
              <option key={`year-${option.id}`} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtros adicionales - siempre visibles en modo sidebar */}
      {(isExpanded || sidebarMode) && (
        <div className={`${sidebarMode ? 'mt-4 space-y-4' : 'mt-4 pt-4 border-t border-gray-200'}`}>
          <div className={`${sidebarMode ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}`}>
            {/* Selector de tag */}
            <div>
              <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">
                Tag
              </label>
              <select
                id="tag"
                name="tag"
                value={localFilters.tag}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg py-2 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
              >
                {tagOptions.map(option => (
                  <option key={`tag-${option.id}`} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Búsqueda de desarrollador */}
            <div>
              <DeveloperSearch 
                value={localFilters.developer} 
                onChange={handleDeveloperChange} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="mt-4 flex justify-end">
        <button
          type="button"
          onClick={() => {
            const resetFilters = {
              year: '',
              genre: '',
              platform: '',
              tag: '',
              developer: ''
            };
            setLocalFilters(resetFilters);
            setFilters(resetFilters);
          }}
          className="px-4 py-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-sm font-medium rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default Filters;
