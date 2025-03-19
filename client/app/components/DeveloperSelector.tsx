import React, { useState, useEffect } from 'react';
import { getDevelopers } from '../services/api';

interface Developer {
  id: number;
  name: string;
  slug: string;
  image_background?: string;
  games_count?: number;
}

interface DeveloperSearchProps {
  value: string;
  onChange: (developerSlug: string) => void;
}

const DeveloperSearch: React.FC<DeveloperSearchProps> = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
  
  // Efecto para buscar desarrolladores cuando cambia el término de búsqueda
  useEffect(() => {
    const searchDevelopers = async () => {
      if (searchTerm.length < 2) {
        setDevelopers([]);
        return;
      }
      
      setIsLoading(true);
      try {
        const data = await getDevelopers(1, 10, searchTerm);
        setDevelopers(data.results || []);
      } catch (error) {
        // Eliminado el console.error
        setDevelopers([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    const timer = setTimeout(searchDevelopers, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);
  
  // Efecto para actualizar el desarrollador seleccionado cuando cambia el valor
  useEffect(() => {
    const fetchSelectedDeveloper = async () => {
      if (value && !selectedDeveloper) {
        try {
          // Intentar encontrar el desarrollador por slug
          const data = await getDevelopers(1, 10, value);
          const developer = data.results?.find((dev: Developer) => dev.slug === value);
          if (developer) {
            setSelectedDeveloper(developer);
          }
        } catch (error) {
          // Eliminado el console.error
        }
      } else if (!value) {
        setSelectedDeveloper(null);
      }
    };
    
    fetchSelectedDeveloper();
  }, [value, selectedDeveloper]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };
  
  const handleSelectDeveloper = (developer: Developer) => {
    setSelectedDeveloper(developer);
    onChange(developer.slug);
    setSearchTerm('');
    setShowResults(false);
  };
  
  const handleClear = () => {
    setSelectedDeveloper(null);
    setSearchTerm('');
    onChange('');
  };
  
  // Click fuera para cerrar los resultados
  useEffect(() => {
    const handleClickOutside = () => {
      setShowResults(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  return (
    <div>
      <label className="block text-sm font-medium text-primary transition-theme mb-1">Desarrollador</label>
      
      {selectedDeveloper ? (
        <div className="flex items-center card border transition-theme rounded-lg p-2">
          {selectedDeveloper.image_background && (
            <div className="flex-shrink-0 h-10 w-10 mr-3">
              <img 
                src={selectedDeveloper.image_background} 
                alt={selectedDeveloper.name} 
                className="h-full w-full rounded-md object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <div className="text-sm font-medium text-primary transition-theme">{selectedDeveloper.name}</div>
            {selectedDeveloper.games_count && (
              <div className="text-xs text-secondary transition-theme">{selectedDeveloper.games_count} juegos</div>
            )}
          </div>
          <button 
            onClick={handleClear}
            className="ml-2 text-secondary hover:text-primary transition-theme"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <input 
              type="text"
              placeholder="Buscar desarrollador..."
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => setShowResults(true)}
              className="w-full pl-3 pr-10 py-2 border border-normal rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-input text-primary transition-theme"
            />
            {isLoading && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg className="animate-spin h-5 w-5 text-secondary transition-theme" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </div>
          
          {showResults && searchTerm.length >= 2 && (
            <div className="absolute z-10 w-full mt-1 card rounded-md shadow-lg border border-normal transition-theme max-h-60 overflow-y-auto">
              {developers.length > 0 ? (
                <ul>
                  {developers.map((developer) => (
                    <li 
                      key={developer.id} 
                      className="px-4 py-2 hover:bg-navbar cursor-pointer flex items-center transition-theme"
                      onClick={() => handleSelectDeveloper(developer)}
                    >
                      {developer.image_background && (
                        <div className="flex-shrink-0 h-8 w-8 mr-2">
                          <img 
                            src={developer.image_background} 
                            alt={developer.name} 
                            className="h-full w-full rounded-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="text-sm font-medium text-primary transition-theme">{developer.name}</div>
                        {developer.games_count && (
                          <div className="text-xs text-secondary transition-theme">{developer.games_count} juegos</div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-2 text-sm text-secondary transition-theme">
                  No se encontraron desarrolladores
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      <p className="mt-1 text-xs text-secondary transition-theme">
        {selectedDeveloper 
          ? `Desarrollador seleccionado: ${selectedDeveloper.name}`
          : "Busca y selecciona un desarrollador"}
      </p>
    </div>
  );
};

export default DeveloperSearch;