require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Middleware
const allowedOrigins = [
  'http://localhost:3000',               // Desarrollo frontend local
  'http://localhost:5173',               // Vite dev server
  'https://tu-dominio-frontend.com'      // Tu dominio de producción
];

app.use(cors({
  origin: function(origin, callback) {
    // Permitir solicitudes sin origen (como aplicaciones móviles o curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Environment variables
const API_KEY = process.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

// FiltersType interface would be defined in TypeScript
// For JavaScript, we'll just document the expected shape of the filters object

/**
 * Fetches games from the RAWG API
 * @param {string} searchQuery - Search term
 * @param {number} page - Page number
 * @param {number} pageSize - Number of results per page
 * @param {Object} filters - Filtering options
 * @param {string} filters.year - Year filter
 * @param {string} filters.genre - Genre ID
 * @param {string} filters.platform - Platform ID
 * @param {string} filters.tag - Tag ID
 * @param {string} filters.developer - Developer slug
 * @returns {Promise<Object>} - API response
 */
const getGames = async (
  searchQuery = '', 
  page = 1, 
  pageSize = 20,
  filters = { year: '', genre: '', platform: '', tag: '', developer: '' }
) => {
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

  // Log the URL being requested (without the API key for security)
  const urlWithoutKey = url.replace(API_KEY, 'API_KEY_HIDDEN');
  console.log('Requesting URL:', urlWithoutKey);

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Error fetching games')
  }
  const data = await response.json()
  
  // Log raw API response data
  console.log('Raw API Response:');
  console.log(JSON.stringify(data, null, 2));
  
  return data
}

/**
 * Fetches developers from the RAWG API
 * @param {number} page - Page number
 * @param {number} pageSize - Number of results per page
 * @param {string} search - Search term
 * @returns {Promise<Object>} - API response
 */
const getDevelopers = async (page = 1, pageSize = 20, search = '') => {
  let url = `${BASE_URL}/developers?key=${API_KEY}&page=${page}&page_size=${pageSize}`;
  
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }
  
  // Log the URL being requested (without the API key for security)
  const urlWithoutKey = url.replace(API_KEY, 'API_KEY_HIDDEN');
  console.log('Requesting Developers URL:', urlWithoutKey);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching developers');
  }
  const data = await response.json();
  return data;
};

/**
 * Fetches game details from the RAWG API
 * @param {string} id - Game ID
 * @returns {Promise<Object>} - API response
 */
const getGameDetails = async (id) => {
  const url = `${BASE_URL}/games/${id}?key=${API_KEY}`;
  
  // Log the URL being requested (without the API key for security)
  const urlWithoutKey = url.replace(API_KEY, 'API_KEY_HIDDEN');
  console.log('Requesting Game Details URL:', urlWithoutKey);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error fetching game details');
  }
  const data = await response.json();
  return data;
};

/**
 * Fetches game trailers from the RAWG API
 * @param {string} id - Game ID
 * @returns {Promise<Object>} - API response
 */
const getGameTrailers = async (id) => {
  const url = `${BASE_URL}/games/${id}/movies?key=${API_KEY}`;
  
  // Log the URL being requested (without the API key for security)
  const urlWithoutKey = url.replace(API_KEY, 'API_KEY_HIDDEN');
  console.log('Requesting Game Trailers URL:', urlWithoutKey);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error fetching game trailers');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trailers:", error.message);
    throw error;
  }
};

/**
 * Fetches game screenshots from the RAWG API
 * @param {string} id - Game ID
 * @returns {Promise<Object>} - API response
 */
const getGameScreenshots = async (id) => {
  const url = `${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`;
  
  // Log the URL being requested (without the API key for security)
  const urlWithoutKey = url.replace(API_KEY, 'API_KEY_HIDDEN');
  console.log('Requesting Game Screenshots URL:', urlWithoutKey);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Error fetching game screenshots');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching screenshots:", error.message);
    throw error;
  }
};

app.get('/', (req, res) => {
  res.send();
});

// Endpoint to get games
app.get('/api/games', async (req, res) => {
  try {
    const { search = '', page = 1, pageSize = 20, year = '', genre = '', platform = '', tag = '', developer = '' } = req.query;
    
    const filters = {
      year,
      genre,
      platform,
      tag,
      developer
    };
    
    const games = await getGames(search, parseInt(page), parseInt(pageSize), filters);
    
    console.log('Games API request successful');
    res.json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

// New endpoint to get developers
app.get('/api/developers', async (req, res) => {
  try {
    const { search = '', page = 1, pageSize = 20 } = req.query;
    
    const developers = await getDevelopers(parseInt(page), parseInt(pageSize), search);
    
    console.log('Developers API request successful');
    res.json(developers);
  } catch (error) {
    console.error('Error fetching developers:', error);
    res.status(500).json({ error: 'Failed to fetch developers' });
  }
});

// New endpoint to get game details
app.get('/api/games/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const gameDetails = await getGameDetails(id);
    
    console.log(`Game details API request successful for game ID: ${id}`);
    res.json(gameDetails);
  } catch (error) {
    console.error(`Error fetching game details for ID ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch game details' });
  }
});

// New endpoint to get game trailers
app.get('/api/games/:id/trailers', async (req, res) => {
  try {
    const { id } = req.params;
    
    const trailers = await getGameTrailers(id);
    
    console.log(`Game trailers API request successful for game ID: ${id}`);
    res.json(trailers);
  } catch (error) {
    console.error(`Error fetching trailers for game ID ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch game trailers' });
  }
});

// New endpoint to get game screenshots
app.get('/api/games/:id/screenshots', async (req, res) => {
  try {
    const { id } = req.params;
    
    const screenshots = await getGameScreenshots(id);
    
    console.log(`Game screenshots API request successful for game ID: ${id}`);
    res.json(screenshots);
  } catch (error) {
    console.error(`Error fetching screenshots for game ID ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch game screenshots' });
  }
});

app.listen(5000, console.log("server is running: port=5000"));

