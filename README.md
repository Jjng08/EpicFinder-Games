# EpicFinder - Explorador de Videojuegos

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

Una aplicación web moderna para explorar, buscar y descubrir videojuegos utilizando la API de RAWG.

![EpicFinder]

## 🎮 Descripción

EpicFinder es una aplicación desarrollada como parte de una prueba técnica que demuestra la implementación de una interfaz de usuario moderna con React. Permite a los usuarios explorar una extensa base de datos de videojuegos con capacidades avanzadas de búsqueda y filtrado.

## 🚀 Características Principales

- **Exploración de juegos**: Lista ordenada por puntuación Metacritic
- **Sistema de búsqueda**: Con implementación de debounce para optimizar peticiones
- **Filtrado avanzado**: Por año, género, plataforma, tags y desarrollador
- **Visualización detallada**: Información completa de cada juego incluyendo trailers y screenshots
- **Diseño adaptativo**: Experiencia optimizada para móvil, tablet y escritorio
- **Modo oscuro/claro**: Sistema de temas con detección de preferencias del sistema

## 🛠️ Tecnologías Utilizadas y Justificación

### Frontend Core
- **React**: Elegido por su eficiencia en la creación de interfaces de usuario interactivas mediante componentes reutilizables
- **TypeScript**: Implementado para añadir tipado estático, mejorando la detección temprana de errores y facilitando el mantenimiento
- **React Router**: Utilizado para la navegación declarativa entre páginas sin recargas completas

### UI/UX
- **Tailwind CSS**: Seleccionado por su enfoque utility-first que acelera el desarrollo sin comprometer la flexibilidad de diseño
- **Sistema de Temas Personalizado**: Desarrollado con variables CSS para ofrecer una experiencia coherente en temas claro y oscuro

### Gestión de Datos
- **RAWG API**: Fuente de datos completa y actualizada sobre videojuegos
- **Fetch API**: Para comunicación HTTP con implementación de caché para optimizar el rendimiento

### Patrones y Técnicas
- **Context API**: Para gestión de estado global (tema, filtros)
- **Componentes controlados**: Para una gestión efectiva de formularios y filtros
- **Lazy loading**: Para optimizar la carga inicial de la aplicación
- **Responsive Design**: Implementación mobile-first para asegurar compatibilidad con todos los dispositivos

## 📁 Estructura del Proyecto

├── app/ 
│ ├── components/ # Componentes reutilizables 
│ ├── context/ # Contextos para estado global 
│ ├── routes/ # Páginas principales 
│ ├── services/ # Servicios de API 
│ ├── styles/ # Estilos y tema 
│ └── types/ # Definiciones de TypeScript 
└── public/ # Recursos estáticos


## ✨ Aspectos Técnicos Destacables

### Sistema de Temas Personalizado
- Implementación con variables CSS para transiciones fluidas entre temas
- Detección automática de preferencias del sistema
- Persistencia de elección del usuario mediante localStorage

### Optimización de Rendimiento
- Implementación de debounce en búsquedas para limitar peticiones a la API
- Paginación para gestionar grandes conjuntos de datos
- Carga condicional de componentes según necesidad

### Experiencia de Usuario
- Estados de carga gestionados con componentes de skeleton
- Manejo defensivo de errores con fallbacks intuitivos
- Navegación optimizada con indicadores de estado

## 📦 Instalación y Uso

### Requisitos Previos
- Node.js (v14.0.0 o superior)
- npm o yarn
- API Key de RAWG (obtener en [https://rawg.io/apidocs](https://rawg.io/apidocs))

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Jjng08/EpicFinder-Games.git
   cd EpicFinder-Games


Instalar dependencias:

npm install


Crear archivo .env en la raíz del proyecto:

REACT_RAWG_API_KEY=tu_api_key_aquí

Iniciar en modo desarrollo:

npm run dev

Abrir http://localhost:5173 en el navegador

🔍 Decisiones Técnicas
TypeScript sobre JavaScript: Elegido para mejorar la mantenibilidad y confiabilidad del código mediante tipado estático.
Tailwind sobre CSS tradicional: Seleccionado para acelerar el desarrollo sin necesidad de cambiar constantemente entre archivos de estilos y componentes.
Context API sobre Redux: Para proyectos de esta escala, Context API ofrece una solución más ligera y directa para la gestión de estado global.
Sistema de temas personalizado: Desarrollado para ofrecer una experiencia visual coherente y accesible que respete las preferencias del usuario.
🤝 Contribuciones
Las contribuciones son bienvenidas. Para contribuir:

Fork del repositorio
Crear una rama para tu funcionalidad (git checkout -b feature/amazing-feature)
Commit de cambios (git commit -m 'Add some amazing feature')
Push a la rama (git push origin feature/amazing-feature)
Abrir Pull Request
📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

🙏 Agradecimientos
RAWG por proporcionar una API robusta con información detallada sobre videojuegos
Todos los colaboradores y personas que han aportado feedback para mejorar este proyecto
Desarrollado por Javier Nieves.