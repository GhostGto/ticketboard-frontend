import React from 'react';
import { useTickets } from '../hooks/useTickets';
import { useAuth } from '../hooks/useAuth';

const Dashboard = () => {
  const { tickets, loading } = useTickets();
  const { user } = useAuth();

  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'OPEN').length,
    inProgress: tickets.filter(t => t.status === 'IN_PROGRESS').length,
    closed: tickets.filter(t => t.status === 'CLOSED').length
  };

  if (loading) {
    return <div className="loading">Cargando dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Bienvenido, {user?.username}!</p>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Tickets</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card open">
          <h3>Abiertos</h3>
          <p className="stat-number">{stats.open}</p>
        </div>
        <div className="stat-card progress">
          <h3>En Progreso</h3>
          <p className="stat-number">{stats.inProgress}</p>
        </div>
        <div className="stat-card closed">
          <h3>Cerrados</h3>
          <p className="stat-number">{stats.closed}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
