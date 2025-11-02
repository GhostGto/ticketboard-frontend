import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">🎫 TicketBoard</Link>
      </div>
      
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/tickets">Tickets</Link>
        <span className="user-info">Hola, {user?.username}</span>
        <button onClick={handleLogout} className="logout-btn">
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
