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

  return (
    <div className="my-4">
      <input
        type="text"
        placeholder="Buscar videojuegos..."
        value={inputValue}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
    </div>
  )
}

export default SearchBar
