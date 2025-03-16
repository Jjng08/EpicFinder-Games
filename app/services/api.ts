import type { FiltersType } from '../types'

const API_KEY = import.meta.env.VITE_RAWG_API_KEY
const BASE_URL = 'https://api.rawg.io/api'

export const getGames = async (
  searchQuery: string = '', 
  page: number = 1, 
  pageSize: number = 20,
  filters: FiltersType = { year: '', genre: '', platform: '', tag: '', developer: '' }
): Promise<any> => {
  // Construimos la URL con los parámetros de búsqueda y paginación
  let url = `${BASE_URL}/games?key=${API_KEY}&ordering=-metacritic&page=${page}&page_size=${pageSize}`
  
  // Añadimos el parámetro de búsqueda si existe
  if (searchQuery) {
    url += `&search=${encodeURIComponent(searchQuery)}`
    url += '&search_precise=true' // Para mejorar la precisión de la búsqueda
  }
  
  // Añadimos el filtro por plataforma si existe
  if (filters.platform) {
    url += `&platforms=${filters.platform}` // Usamos directamente el ID numérico de la plataforma
  }
  
  // Añadimos el filtro por género si existe
  if (filters.genre) {
    url += `&genres=${filters.genre}` // Usamos directamente el ID numérico del género
  }
  
  // Filtramos por año si se proporciona
  if (filters.year) {
    const startDate = `${filters.year}-01-01`;
    const endDate = `${filters.year}-12-31`;
    url += `&dates=${startDate},${endDate}`;
  }
  
  // Añadimos el filtro por tag si existe
  if (filters.tag) {
    url += `&tags=${filters.tag}` // Usamos directamente el ID numérico del tag
  }
  
  // Añadimos el filtro por desarrollador si existe
  if (filters.developer) {
    url += `&developers=${filters.developer}` // Usamos el slug del desarrollador
  }
  
  // Eliminado el console.log de la URL

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Error fetching games')
  }
  const data = await response.json()
  return data
}

// Función para obtener desarrolladores
export const getDevelopers = async (
  page: number = 1, 
  pageSize: number = 20,
  search: string = ''
): Promise<any> => {
  let url = `${BASE_URL}/developers?key=${API_KEY}&page=${page}&page_size=${pageSize}`;
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  // Eliminado el console.log de la URL de desarrolladores
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching developers');
  }
  const data = await response.json();
  return data;
}

export const getGameDetails = async (id: string): Promise<any> => {
  const url = `${BASE_URL}/games/${id}?key=${API_KEY}`
  // Eliminado el console.log de detalles

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Error fetching game details')
  }
  const data = await response.json()
  return data
}

export const getGameTrailers = async (id: string): Promise<any> => {
  const url = `${BASE_URL}/games/${id}/movies?key=${API_KEY}`
  // Eliminado el console.log de trailers

  try {
    const response = await fetch(url)
    if (!response.ok) {
      // Simplificado el manejo de errores
      throw new Error('Error fetching game trailers')
    }
    const data = await response.json()
    // Eliminado el console.log de datos de trailers
    return data;
  } catch (error) {
    // Mantenemos el log de error pero de forma más genérica
    console.error("Error fetching trailers");
    throw error;
  }
}

export const getGameScreenshots = async (id: string): Promise<any> => {
  const url = `${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Error fetching game screenshots')
    }
    const data = await response.json()
    return data;
  } catch (error) {
    // Simplificado el mensaje de error
    console.error("Error fetching screenshots");
    throw error;
  }
}
