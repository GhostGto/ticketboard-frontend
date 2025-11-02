import React from 'react';

const HealthStatus = ({ backendStatus, dbStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy': return '#4CAF50';
      case 'unhealthy': return '#f44336';
      default: return '#ff9800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'healthy': return 'Conectado';
      case 'unhealthy': return 'Error';
      default: return 'Verificando...';
    }
  };

  return (
    <div className="health-status">
      <div className="status-item">
        <span className="status-label">Backend:</span>
        <span 
          className="status-dot"
          style={{ backgroundColor: getStatusColor(backendStatus) }}
        ></span>
        <span className="status-text">{getStatusText(backendStatus)}</span>
      </div>
      <div className="status-item">
        <span className="status-label">Base de Datos:</span>
        <span 
          className="status-dot"
          style={{ backgroundColor: getStatusColor(dbStatus) }}
        ></span>
        <span className="status-text">{getStatusText(dbStatus)}</span>
      </div>
    </div>
  );
};

export default HealthStatus;
