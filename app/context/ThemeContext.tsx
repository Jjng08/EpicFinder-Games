import React, { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Modificar la inicialización del tema para detectar preferencia del sistema
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      // Prioridad 1: Preferencia guardada del usuario
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme as Theme;
      }
      
      // Prioridad 2: Preferencia del sistema
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    // Tema por defecto
    return 'light';
  });

  // Efecto para aplicar las clases del tema al elemento html
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Elimina clases antiguas
    root.classList.remove('light-theme', 'dark-theme');
    
    // Aplica la clase según el tema actual
    root.classList.add(`${theme}-theme`);
    
    // Guarda la preferencia en localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Actualizar el efecto que aplica el tema
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      
      // Eliminar clases antiguas
      root.classList.remove('light-theme', 'dark-theme');
      
      // Aplicar la nueva clase
      root.classList.add(`${theme}-theme`);
      
      // Guardar en localStorage
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  // Añadir detector de cambios en la preferencia del sistema
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        // Solo cambiar automáticamente si el usuario no ha establecido una preferencia
        if (!localStorage.getItem('theme')) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      };
      
      // Agregar listener para cambios en la preferencia del sistema
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback para navegadores antiguos
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, []);

  // Función para alternar entre temas
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar el tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
};