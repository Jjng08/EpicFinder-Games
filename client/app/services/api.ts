import type { FiltersType } from '../types'

// Change the BASE_URL to point to your Express backend
const BASE_URL = 'https://epic-finder-games-server.vercel.app/api'

export const getGames = async (
  searchQuery: string = '', 
  page: number = 1, 
  pageSize: number = 20,
  filters: FiltersType = { year: '', genre: '', platform: '', tag: '', developer: '' }
): Promise<any> => {
  // Build URL with query parameters
  let url = `${BASE_URL}/games?page=${page}&pageSize=${pageSize}`
  
  // Add search parameter if it exists
  if (searchQuery) {
    url += `&search=${encodeURIComponent(searchQuery)}`
  }
  
  // Add platform filter if it exists
  if (filters.platform) {
    url += `&platform=${filters.platform}`
  }
  
  // Add genre filter if it exists
  if (filters.genre) {
    url += `&genre=${filters.genre}`
  }
  
  // Add year filter if it exists
  if (filters.year) {
    url += `&year=${filters.year}`
  }
  
  // Add tag filter if it exists
  if (filters.tag) {
    url += `&tag=${filters.tag}`
  }
  
  // Add developer filter if it exists
  if (filters.developer) {
    url += `&developer=${filters.developer}`
  }
  
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Error fetching games')
  }
  const data = await response.json()
  return data
}

// Function to get developers
export const getDevelopers = async (
  page: number = 1, 
  pageSize: number = 20,
  search: string = ''
): Promise<any> => {
  let url = `${BASE_URL}/developers?page=${page}&pageSize=${pageSize}`;
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching developers');
  }
  const data = await response.json();
  return data;
}

export const getGameDetails = async (id: string): Promise<any> => {
  const url = `${BASE_URL}/games/${id}`

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Error fetching game details')
  }
  const data = await response.json()
  return data
}

export const getGameTrailers = async (id: string): Promise<any> => {
  const url = `${BASE_URL}/games/${id}/trailers`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Error fetching game trailers')
    }
    const data = await response.json()
    return data;
  } catch (error) {
    console.error("Error fetching trailers");
    throw error;
  }
}

export const getGameScreenshots = async (id: string): Promise<any> => {
  const url = `${BASE_URL}/games/${id}/screenshots`

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Error fetching game screenshots')
    }
    const data = await response.json()
    return data;
  } catch (error) {
    console.error("Error fetching screenshots");
    throw error;
  }
}
