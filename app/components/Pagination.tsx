import React from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

// Contenedor principal
export const Pagination: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-1 mt-8">
      {children}
    </div>
  );
};

// Botón de página anterior
interface PaginationPreviousProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const PaginationPrevious: React.FC<PaginationPreviousProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center px-3 h-9 ml-0 text-gray-600 bg-white border border-gray-300 rounded-l-md hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      <span>Anterior</span>
    </button>
  );
};

// Botón de página siguiente
interface PaginationNextProps {
  onClick?: () => void;
  disabled?: boolean;
}

export const PaginationNext: React.FC<PaginationNextProps> = ({ onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center px-3 h-9 text-gray-600 bg-white border border-gray-300 rounded-r-md hover:bg-indigo-50 hover:text-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <span>Siguiente</span>
      <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </button>
  );
};

// Contenedor para la lista de páginas
export const PaginationList: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center h-9">
      {children}
    </div>
  );
};

// Componente de número de página
interface PaginationPageProps {
  page: number;
  current?: boolean;
  onClick?: () => void;
}

export const PaginationPage: React.FC<PaginationPageProps> = ({ page, current = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center px-3 h-9 leading-tight transition-colors ${
        current
          ? 'text-white bg-indigo-600 border border-indigo-600 hover:bg-indigo-700'
          : 'text-gray-600 bg-white border border-gray-300 hover:bg-indigo-50 hover:text-indigo-700'
      }`}
    >
      {page}
    </button>
  );
};

// Componente para el gap en la paginación
export const PaginationGap: React.FC = () => {
  return (
    <span className="flex items-center justify-center px-3 h-9 leading-tight text-gray-500 bg-white border border-gray-300">
      ...
    </span>
  );
};