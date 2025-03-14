GameDB - Aplicación de Exploración de Videojuegos
GameDB es una aplicación web desarrollada con React que permite a los usuarios buscar, filtrar y explorar información detallada sobre videojuegos utilizando la API pública de RAWG.

🎮 Características principales
Exploración de juegos: Visualiza una lista de videojuegos ordenados por puntuación de Metacritic
Búsqueda avanzada: Encuentra juegos específicos mediante una barra de búsqueda con debounce
Sistema de filtrado completo:
Por año de lanzamiento
Por género
Por plataforma
Por etiquetas (tags)
Por desarrollador
Página de detalles: Visualiza información completa de cada juego:
Datos básicos (título, fecha de lanzamiento, plataformas)
Puntuación Metacritic y valoraciones de usuarios
Trailers y/o capturas de pantalla
Descripción detallada
Géneros, etiquetas, desarrolladores y publicadores
🛠️ Tecnologías utilizadas
React: Biblioteca principal para la construcción de la interfaz
React Router: Para la navegación entre páginas
TypeScript: Para tipado estático, mejorando la robustez y mantenibilidad del código
Tailwind CSS: Framework de utilidades CSS para el diseño de la interfaz
RAWG API: Como fuente de datos para la información de videojuegos
📝 Estructura del proyecto
├── app/
│   ├── components/          # Componentes reutilizables
│   │   ├── GameCard.tsx     # Tarjeta de juego para la lista principal
│   │   ├── Filters.tsx      # Componente de filtros
│   │   ├── Navbar.tsx       # Barra de navegación
│   │   ├── SearchBar.tsx    # Barra de búsqueda
│   │   └── ...
│   │
│   ├── routes/              # Páginas principales
│   │   ├── HomePage.tsx     # Página de inicio con lista y filtros
│   │   └── GameDetail.tsx   # Página de detalle de juego
│   │
│   ├── services/            # Servicios y utilidades
│   │   └── api.ts           # Funciones para interactuar con la API de RAWG
│   │
│   ├── types/               # Definiciones de tipos TypeScript
│   │
│   └── root.tsx             # Componente raíz y configuración
│
└── public/                  # Archivos públicos

🚀 Características destacadas
Sistema de filtrado
La aplicación implementa un sistema completo de filtrado que permite a los usuarios encontrar juegos según múltiples criterios, todos aplicables de forma simultánea:

Año: Selector de años desde el actual hasta 25 años atrás
Género: Lista completa de géneros de videojuegos
Plataforma: Principales plataformas de gaming
Tags: Etiquetas populares para clasificar juegos
Desarrollador: Campo con autocompletado para buscar por estudio desarrollador
Visualización adaptativa de multimedia
En la página de detalles del juego, la aplicación muestra:

Trailers: Si están disponibles en la API de RAWG
Capturas de pantalla: Como alternativa cuando no hay trailers disponibles
Mensaje informativo: Con enlace a búsqueda externa cuando no hay ningún contenido multimedia
Diseño responsivo
La interfaz se adapta a diferentes tamaños de pantalla:

Dispositivos móviles: Visualización optimizada para pantallas pequeñas
Tablets: Layout adaptado para aprovechar el espacio adicional
Escritorio: Experiencia completa con visualización de múltiples elementos en pantalla
📦 Instalación y uso
Requisitos previos
Node.js (v14.0.0 o superior)
npm o yarn
API Key de RAWG (obtenible en https://rawg.io/apidocs)
Pasos de instalación
Clona el repositorio:
git clone https://github.com/tu-usuario/gamedb.git
cd gamedb
Instala las dependencias:
npm install
Crea un archivo .env en la raíz del proyecto con tu API Key de RAWG:
REACT_RAWG_API_KEY=tu_api_key_aquí
Inicia la aplicación en modo desarrollo:
npm run dev
Abre http://localhost:5173 para ver la aplicación en tu navegador.

🤝 Contribuir
Las contribuciones son bienvenidas. Para contribuir:

Haz fork del repositorio
Crea una rama para tu característica (git checkout -b feature/amazing-feature)
Haz commit de tus cambios (git commit -m 'Add some amazing feature')
Empuja la rama (git push origin feature/amazing-feature)
Abre un Pull Request
📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

🙏 Agradecimientos
A RAWG por proporcionar una API pública con información detallada sobre videojuegos
A todos los contribuidores que han ayudado a mejorar este proyecto
Desarrollado con ❤️ por [JavierNieves]