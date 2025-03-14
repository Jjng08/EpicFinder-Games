import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Función para determinar si un enlace está activo
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#dfe8f0] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <svg 
                className="h-8 w-8 text-blue-500" 
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
              <span className="ml-2 text-xl font-bold text-indigo-800">GameFinder</span>
            </Link>

            {/* Enlaces de navegación para pantallas medianas y grandes */}
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              <Link
                to="/"
                className={`${
                  isActive('/') ? 'text-indigo-600 border-b-2 border-indigo-500' : 'text-indigo-800 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300'
                } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                Inicio
              </Link>
              <Link
                to="/top-games"
                className={`${
                  isActive('/top-games') ? 'text-indigo-600 border-b-2 border-indigo-500' : 'text-gray-700 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300'
                } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                Top Juegos
              </Link>
              <Link
                to="/new-releases"
                className={`${
                  isActive('/new-releases') ? 'text-indigo-600 border-b-2 border-indigo-500' : 'text-gray-700 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300'
                } px-3 py-2 rounded-md text-sm font-medium transition-colors`}
              >
                Nuevos Lanzamientos
              </Link>
            </div>
          </div>

          {/* Elementos del lado derecho */}
          <div className="hidden md:flex md:items-center md:ml-6">
            <div className="ml-3 relative">
              <a
                href="https://rawg.io/apidocs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                API Docs
              </a>
            </div>
          </div>

          {/* Botón de menú móvil */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-gray-200 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Icono cuando el menú está cerrado */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icono cuando el menú está abierto */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil, mostrar/ocultar según el estado */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`${
              isActive('/') ? 'text-indigo-600 border-b-2 border-indigo-500' : 'text-gray-700 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300'
            } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            to="/top-games"
            className={`${
              isActive('/top-games') ? 'text-indigo-600 border-b-2 border-indigo-500' : 'text-gray-700 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300'
            } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Top Juegos
          </Link>
          <Link
            to="/new-releases"
            className={`${
              isActive('/new-releases') ? 'text-indigo-600 border-b-2 border-indigo-500' : 'text-gray-700 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300'
            } block px-3 py-2 rounded-md text-base font-medium transition-colors`}
            onClick={() => setIsMenuOpen(false)}
          >
            Nuevos Lanzamientos
          </Link>
          <a
            href="https://rawg.io/apidocs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-300 block px-3 py-2 rounded-md text-base font-medium transition-colors"
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