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
  
  console.log("API GET URL:", url);

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
  
  console.log("API GET URL (Developers):", url);
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching developers');
  }
  const data = await response.json();
  return data;
}

export const getGameDetails = async (id: string): Promise<any> => {
  const url = `${BASE_URL}/games/${id}?key=${API_KEY}`
  console.log("API GET URL (Details):", url);

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Error fetching game details')
  }
  const data = await response.json()
  return data
}

export const getGameTrailers = async (id: string): Promise<any> => {
  const url = `${BASE_URL}/games/${id}/movies?key=${API_KEY}`
  console.log("API GET URL (Trailers):", url);

  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error(`Error fetching trailers: ${response.status} ${response.statusText}`);
      throw new Error('Error fetching game trailers')
    }
    const data = await response.json()
    console.log("Trailer data received:", data);
    return data;
  } catch (error) {
    console.error("Error in getGameTrailers:", error);
    throw error;
  }
}

export const getGameScreenshots = async (id: string): Promise<any> => {
  const url = `${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`
  console.log("API GET URL (Screenshots):", url);

  try {
    const response = await fetch(url)
    if (!response.ok) {
      console.error(`Error fetching screenshots: ${response.status} ${response.statusText}`);
      throw new Error('Error fetching game screenshots')
    }
    const data = await response.json()
    console.log("Screenshots data received:", data);
    return data;
  } catch (error) {
    console.error("Error in getGameScreenshots:", error);
    throw error;
  }
}
