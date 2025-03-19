import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="my-8 mx-auto max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-primary transition-theme">Acerca de EpicFinder</h1>
      
      {/* El Proyecto */}
      <div className="card rounded-xl shadow-lg overflow-hidden transition-theme mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-normal transition-theme">
            El Proyecto
          </h2>
          
          <div className="prose max-w-none text-primary transition-theme">
            <p className="mb-4">
              EpicFinder es una aplicación web desarrollada con React que permite a los usuarios buscar, filtrar 
              y explorar información detallada sobre videojuegos utilizando la API pública de RAWG.
            </p>
            
            <p className="mb-4">
              Este proyecto fue creado como parte de una prueba técnica para demostrar habilidades en 
              desarrollo frontend moderno, utilizando React y TypeScript para crear una interfaz 
              interactiva y responsive que consume datos de una API externa.
            </p>
            
            <p className="mb-6">
              La aplicación incluye un sistema completo de filtrado, búsqueda avanzada, visualización 
              detallada de juegos y un sistema de tema claro/oscuro para mejorar la experiencia de usuario.
            </p>
          </div>
        </div>
      </div>
      
      {/* Cómo Funciona la Web - NUEVA SECCIÓN */}
      <div className="card rounded-xl shadow-lg overflow-hidden transition-theme mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-normal transition-theme">
            Cómo Funciona la Web
          </h2>
          
          <div className="space-y-6 transition-theme">
            {/* Navegación y Búsqueda */}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-primary transition-theme">Exploración y Búsqueda</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div className="card p-4 rounded-lg transition-theme">
                  <h4 className="font-medium mb-2 text-primary transition-theme">Página Principal</h4>
                  <p className="text-secondary text-sm transition-theme">
                    La página de inicio muestra una lista de juegos ordenados por puntuación de Metacritic, con opciones 
                    de filtrado avanzadas y paginación para explorar el catálogo completo.
                  </p>
                </div>
                <div className="card p-4 rounded-lg transition-theme">
                  <h4 className="font-medium mb-2 text-primary transition-theme">Búsqueda</h4>
                  <p className="text-secondary text-sm transition-theme">
                    El campo de búsqueda permite encontrar juegos específicos introduciendo términos relacionados. 
                    Los resultados se actualizan en tiempo real conforme escribes.
                  </p>
                </div>
                <div className="card p-4 rounded-lg transition-theme">
                  <h4 className="font-medium mb-2 text-primary transition-theme">Filtros</h4>
                  <p className="text-secondary text-sm transition-theme">
                    Los filtros permiten refinar la búsqueda por año, género, plataformas, tags y desarrolladores, 
                    pudiendo combinarse para encontrar exactamente lo que buscas.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Detalles del Juego */}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-primary transition-theme">Páginas de Detalle</h3>
              <p className="mb-3 text-secondary transition-theme">
                Al hacer clic en una tarjeta de juego, accedes a su página de detalle donde encontrarás:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card p-4 rounded-lg transition-theme">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                    </svg>
                    <h4 className="font-medium text-primary transition-theme">Información General</h4>
                  </div>
                  <p className="text-secondary text-sm transition-theme">
                    Título, fecha de lanzamiento, desarrolladores, puntuación de Metacritic y plataformas 
                    disponibles. La cabecera muestra la imagen principal del juego.
                  </p>
                </div>
                
                <div className="card p-4 rounded-lg transition-theme">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
                    </svg>
                    <h4 className="font-medium text-primary transition-theme">Contenido Multimedia</h4>
                  </div>
                  <p className="text-secondary text-sm transition-theme">
                    Trailers y capturas de pantalla que te permiten visualizar el juego antes de adquirirlo. 
                    Si no hay contenido disponible, se ofrece un enlace para buscar imágenes en Google.
                  </p>
                </div>
                
                <div className="card p-4 rounded-lg transition-theme">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
                    </svg>
                    <h4 className="font-medium text-primary transition-theme">Descripción</h4>
                  </div>
                  <p className="text-secondary text-sm transition-theme">
                    Resumen detallado del juego que proporciona información sobre la historia, jugabilidad y 
                    características principales.
                  </p>
                </div>
                
                <div className="card p-4 rounded-lg transition-theme">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    <h4 className="font-medium text-primary transition-theme">Categorización</h4>
                  </div>
                  <p className="text-secondary text-sm transition-theme">
                    Géneros y tags que facilitan encontrar juegos similares y entender mejor el tipo de 
                    experiencia que ofrece el juego.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Temas y Adaptabilidad */}
            <div>
              <h3 className="font-semibold text-lg mb-3 text-primary transition-theme">Características Adicionales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card p-4 rounded-lg transition-theme">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                    </svg>
                    <h4 className="font-medium text-primary transition-theme">Cambio de Tema</h4>
                  </div>
                  <p className="text-secondary text-sm transition-theme">
                    El botón de tema en la esquina superior derecha permite cambiar entre modo claro y oscuro, 
                    guardando tu preferencia para futuras visitas.
                  </p>
                </div>
                
                <div className="card p-4 rounded-lg transition-theme">
                  <div className="flex items-center mb-2">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                    </svg>
                    <h4 className="font-medium text-primary transition-theme">Diseño Responsive</h4>
                  </div>
                  <p className="text-secondary text-sm transition-theme">
                    La interfaz se adapta automáticamente a diferentes tamaños de pantalla, desde móviles 
                    hasta monitores de escritorio.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tecnologías Utilizadas */}
      <div className="card rounded-xl shadow-lg overflow-hidden transition-theme mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-normal transition-theme">
            Tecnologías Utilizadas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-primary transition-theme">Frontend</h3>
              <ul className="list-disc pl-5 space-y-1 text-secondary transition-theme">
                <li>React (con React Router para la navegación)</li>
                <li>TypeScript (para tipado estático)</li>
                <li>Tailwind CSS (para estilos y diseño responsive)</li>
                <li>Context API (para gestión de estado global)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2 text-primary transition-theme">Herramientas y Servicios</h3>
              <ul className="list-disc pl-5 space-y-1 text-secondary transition-theme">
                <li>Vite (para desarrollo y build)</li>
                <li>RAWG API (como fuente de datos)</li>
                <li>GitHub (para control de versiones)</li>
                <li>ESLint/Prettier (para linting y formateo)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-primary transition-theme">Características Implementadas</h3>
            <ul className="list-disc pl-5 space-y-1 text-secondary transition-theme">
              <li>Sistema de temas claro/oscuro con detección de preferencias del sistema</li>
              <li>Filtrado avanzado por múltiples criterios</li>
              <li>Búsqueda con debounce para mejor rendimiento</li>
              <li>Visualización detallada de información de juegos</li>
              <li>Interfaz adaptativa para diferentes dispositivos</li>
              <li>Manejo de errores y estados de carga</li>
              <li>Componentes reutilizables para la interfaz</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* API y Atribuciones */}
      <div className="card rounded-xl shadow-lg overflow-hidden transition-theme mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-normal transition-theme">
            API y Atribuciones
          </h2>
          
          <div className="prose max-w-none text-primary transition-theme">
            <p className="mb-4">
              EpicFinder utiliza la <a href="https://rawg.io/apidocs" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">API de RAWG</a> para 
              obtener datos actualizados sobre videojuegos, incluyendo información básica, puntuaciones, 
              capturas de pantalla, trailers y más.
            </p>
            
            <p className="mb-4">
              RAWG proporciona una amplia base de datos de más de 350,000 juegos para más de 50 plataformas. 
              Esta aplicación utiliza estos datos de forma no comercial y con fines demostrativos.
            </p>
            
            <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg transition-theme">
              <p className="font-medium mb-2 text-primary transition-theme">Atribución requerida:</p>
              <p className="text-sm text-secondary transition-theme">
                Los datos sobre videojuegos mostrados en esta aplicación son proporcionados por la 
                API de RAWG.IO. EpicFinder no está afiliado ni respaldado por RAWG.IO.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contacto */}
      <div className="card rounded-xl shadow-lg overflow-hidden transition-theme mb-8">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b pb-2 border-normal transition-theme">
            Contacto
          </h2>
          
          <div className="flex flex-col md:flex-row gap-8 mt-6">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-3 text-primary transition-theme">Javier Nieves</h3>
              <p className="text-secondary mb-4 transition-theme">
                Desarrollador Full Stack con experiencia en múltiples tecnologías, incluyendo React, TypeScript, Node.js, 
                bases de datos SQL/NoSQL. Especializado en crear soluciones integrales desde el 
                frontend hasta el backend con énfasis en rendimiento y experiencia de usuario.
              </p>
              
              <div className="space-y-2">
                <a 
                  href="https://github.com/Jjng08" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-accent hover:underline transition-theme"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/javier-nieves-898543286/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-accent hover:underline transition-theme"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                
                <a 
                  href="mailto:jjng0812@gmail.com" 
                  className="flex items-center text-accent hover:underline transition-theme"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Contacto por email
                </a>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-3 text-primary transition-theme">Cómo Contribuir</h3>
              <p className="text-secondary mb-4 transition-theme">
                ¿Te interesa contribuir a este proyecto? Estas son algunas formas en las que puedes ayudar:
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-secondary transition-theme">
                <li>Reportar bugs o problemas que encuentres</li>
                <li>Sugerir nuevas características o mejoras</li>
                <li>Enviar pull requests con correcciones o nuevas funcionalidades</li>
                <li>Mejorar la documentación del código</li>
              </ul>
              
              <div className="mt-4">
                <a 
                  href="https://github.com/Jjng08/EpicFinder-Games/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Contribuir al Proyecto
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-8 mb-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-accent hover:underline transition-theme"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Volver a la página de inicio
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;