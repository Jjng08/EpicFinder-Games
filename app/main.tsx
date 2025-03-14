import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'

// React Router ya está configurado en el archivo root.tsx
// No necesitamos un BrowserRouter aquí
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* App se importará automáticamente por React Router */}
  </React.StrictMode>
)
