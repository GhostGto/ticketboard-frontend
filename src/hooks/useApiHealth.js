import { useState, useEffect } from 'react';
import { healthService } from '../services/api';

export const useApiHealth = () => {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [dbStatus, setDbStatus] = useState('checking');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        // Verificar backend
        await healthService.checkBackend();
        setBackendStatus('healthy');
        
        // Verificar base de datos
        await healthService.checkDatabase();
        setDbStatus('healthy');
      } catch (error) {
        setBackendStatus('unhealthy');
        setDbStatus('unhealthy');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Verificar cada 30 segundos
    
    return () => clearInterval(interval);
  }, []);

  return { backendStatus, dbStatus };
};
