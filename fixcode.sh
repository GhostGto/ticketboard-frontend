#!/bin/bash

echo "🔧 SOLUCIÓN DEFINITIVA - ELIMINANDO CARACTERES PROBLEMÁTICOS"

cd /Users/gustavotejeda/Documents/devops-journey/ticketboard/ticketboard-frontend

# 1. ELIMINAR COMPLETAMENTE el archivo problemático
echo "🗑️ Eliminando useAuth.js problemático..."
rm -f src/hooks/useAuth.js

# 2. Crear useAuth.js desde cero con encoding limpio
echo "📝 Creando useAuth.js limpio..."
cat >src/hooks/useAuth.js <<'END_OF_FILE'
import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const response = await authService.verifyToken();
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('authToken', token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error en el login' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('authToken', token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error en el registro' 
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return React.createElement(
    AuthContext.Provider,
    { value: value },
    children
  );
};
END_OF_FILE

# 3. Verificar el archivo creado
echo "🔍 Verificando useAuth.js..."
node -c src/hooks/useAuth.js && echo "✅ useAuth.js sintácticamente correcto"

# 4. Probar build
echo "🏗️ Probando build..."
if npm run build; then
  echo "✅ ✅ ✅ BUILD EXITOSO!"
else
  echo "❌ Falló el build, intentando alternativa..."

  # Alternativa: usar createElement en lugar de JSX
  cat >src/hooks/useAuth.js <<'END_OF_FILE'
import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const response = await authService.verifyToken();
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error verificando autenticación:', error);
      localStorage.removeItem('authToken');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const { token, user } = response.data;
      
      localStorage.setItem('authToken', token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error en el login' 
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const { token, user } = response.data;
      
      localStorage.setItem('authToken', token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error en el registro' 
      };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return React.createElement(
    AuthContext.Provider,
    { value: value },
    children
  );
};
END_OF_FILE

  # Probar build nuevamente
  npm run build && echo "✅ ✅ ✅ BUILD EXITOSO CON ALTERNATIVA!" || echo "❌ Falló la alternativa"
fi
