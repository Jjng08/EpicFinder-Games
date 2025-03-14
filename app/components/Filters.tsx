import React, { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import type { FiltersType } from '../types'

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
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
  const [localFilters, setLocalFilters] = useState<FiltersType>(filters);
  
  const handleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({
      ...prev,
      [name]: value
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
    <div className="my-4 bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Filtros</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Selector de plataforma */}
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-1">Plataforma</label>
          <select
            id="platform"
            name="platform"
            value={localFilters.platform}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {platformOptions.map(option => (
              <option key={`platform-${option.id}`} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
        
        {/* Selector de género */}
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">Género</label>
          <select
            id="genre"
            name="genre"
            value={localFilters.genre}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {genreOptions.map(option => (
              <option key={`genre-${option.id}`} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
        
        {/* Selector de año */}
        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">Año</label>
          <select
            id="year"
            name="year"
            value={localFilters.year}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {yearOptions.map(option => (
              <option key={`year-${option.id}`} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
        
        {/* Selector de tag */}
        <div>
          <label htmlFor="tag" className="block text-sm font-medium text-gray-700 mb-1">Tag</label>
          <select
            id="tag"
            name="tag"
            value={localFilters.tag}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {tagOptions.map(option => (
              <option key={`tag-${option.id}`} value={option.id}>{option.name}</option>
            ))}
          </select>
        </div>
        
        {/* Input de búsqueda por desarrollador */}
        <div>
          <label htmlFor="developer" className="block text-sm font-medium text-gray-700 mb-1">
            Desarrollador <span className="text-xs text-gray-500">(ej: rockstar-games)</span>
          </label>
          <input
            type="text"
            id="developer"
            name="developer"
            placeholder="Ingresa un slug de desarrollador"
            value={localFilters.developer}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Botón para limpiar filtros */}
        <div className="flex items-end">
          <button
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
            className="w-full py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-md focus:outline-none transition-colors"
          >
            Limpiar Filtros
          </button>
        </div>
      </div>
      
      {/* Información sobre desarrolladores */}
      {localFilters.developer && (
        <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded">
          <p className="font-medium">Tip para buscar por desarrollador:</p>
          <p>Usa el slug del desarrollador (ej: 'rockstar-games', 'naughty-dog', 'cd-projekt-red')</p>
          <p className="mt-1">Para ver todos los desarrolladores, consulta:&nbsp;
            <a 
              href="https://api.rawg.io/api/developers?key=a302f5e6822f494ab2db141385e43838" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Lista de desarrolladores
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Filters;
