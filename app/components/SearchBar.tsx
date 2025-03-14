import React, { useState, useEffect } from 'react'
import type { ChangeEvent } from 'react'

interface SearchBarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  const [inputValue, setInputValue] = useState(searchQuery)
  
  // Utilizamos un temporizador para evitar realizar una búsqueda con cada pulsación de tecla
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== searchQuery) {
        setSearchQuery(inputValue)
      }
    }, 500) // Esperar 500ms después de que el usuario deje de escribir

    return () => clearTimeout(timer)
  }, [inputValue, searchQuery, setSearchQuery])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  
  const handleClear = () => {
    setInputValue('')
    setSearchQuery('')
  }

  return (
    <div className="my-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg 
            className="w-5 h-5 text-gray-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        
        <input
          type="text"
          placeholder="Buscar videojuegos..."
          value={inputValue}
          onChange={handleChange}
          className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-gray-800"
        />
        
        {inputValue && (
          <button 
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            type="button"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar
