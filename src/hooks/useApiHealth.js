import { useState, useEffect } from 'react';
import { healthService } from '../services/api';

export const useApiHealth = () => {
  const [backendStatus, setBackendStatus] = useState('checking');
  const [dbStatus, setDbStatus] = useState('checking');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await healthService.checkBackend();
        setBackendStatus('healthy');
        
        try {
          await healthService.checkDatabase();
          setDbStatus('healthy');
        } catch (dbError) {
          setDbStatus('unhealthy');
        }
      } catch (error) {
        setBackendStatus('unhealthy');
        setDbStatus('unhealthy');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { backendStatus, dbStatus };
};
