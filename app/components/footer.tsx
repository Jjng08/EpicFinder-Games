import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer py-6 transition-theme">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3">
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
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">GameFinder</span>
                    </Link>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
                        <li>
                            <Link to="/" className="hover:text-indigo-600 me-4 md:me-6">Inicio</Link>
                        </li>
                        <li>
                            <Link to="/top-games" className="hover:text-indigo-600 me-4 md:me-6">Top Juegos</Link>
                        </li>
                        <li>
                            <Link to="/new-releases" className="hover:text-indigo-600 me-4 md:me-6">Nuevos Lanzamientos</Link>
                        </li>
                        <li>
                            <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">API Docs</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />
                <span className="block text-sm sm:text-center">
                    © {new Date().getFullYear()} <Link to="/" className="hover:underline">GameFinder™</Link>. Todos los derechos reservados.
                </span>
            </div>
        </footer>
    );
}


