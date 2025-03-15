import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Función para verificar si un enlace está activo
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar shadow-sm transition-theme">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <svg 
                className="h-8 w-8 text-indigo-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                />
              </svg>
              <span className="ml-2 text-xl font-bold">GameFinder</span>
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link
                to="/"
                className={`${
                  isActive('/') ? 'border-b-2 border-indigo-500 active-link font-medium' : ''
                } px-3 py-2 rounded-md text-sm transition-colors hover:border-b-2 hover:border-indigo-300`}
              >
                Inicio
              </Link>
              <Link
                to="/top-games"
                className={`${
                  isActive('/top-games') ? 'border-b-2 border-indigo-500 active-link font-medium' : ''
                } px-3 py-2 rounded-md text-sm transition-colors hover:border-b-2 hover:border-indigo-300`}
              >
                Top Juegos
              </Link>
              <Link
                to="/new-releases"
                className={`${
                  isActive('/new-releases') ? 'border-b-2 border-indigo-500 active-link font-medium' : ''
                } px-3 py-2 rounded-md text-sm transition-colors hover:border-b-2 hover:border-indigo-300`}
              >
                Nuevos Lanzamientos
              </Link>
              <a
                href="https://rawg.io/apidocs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-md text-sm transition-colors hover:border-b-2 hover:border-indigo-300"
              >
                API Docs
              </a>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* Botón de tema */}
            <button
              onClick={toggleTheme}
              className="theme-toggle-btn p-2 rounded-full mr-2 focus:outline-none transition-colors"
              aria-label="Cambiar tema"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            {/* Botón de menú móvil */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md md:hidden focus:outline-none theme-toggle-btn"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menú móvil */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mobile-menu`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`${
              isActive('/') ? 'border-b-2 border-indigo-500 active-link font-medium' : ''
            } block px-3 py-2 rounded-md text-base transition-colors hover:bg-opacity-20 hover:bg-gray-200`}
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/top-games"
            className={`${
              isActive('/top-games') ? 'border-b-2 border-indigo-500 active-link font-medium' : ''
            } block px-3 py-2 rounded-md text-base transition-colors hover:bg-opacity-20 hover:bg-gray-200`}
            onClick={() => setIsMenuOpen(false)}
          >
            Top Juegos
          </Link>
          <Link
            to="/new-releases"
            className={`${
              isActive('/new-releases') ? 'border-b-2 border-indigo-500 active-link font-medium' : ''
            } block px-3 py-2 rounded-md text-base transition-colors hover:bg-opacity-20 hover:bg-gray-200`}
            onClick={() => setIsMenuOpen(false)}
          >
            Nuevos Lanzamientos
          </Link>
          <a
            href="https://rawg.io/apidocs"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 rounded-md text-base transition-colors hover:bg-opacity-20 hover:bg-gray-200"
            onClick={() => setIsMenuOpen(false)}
          >
            API Docs
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;