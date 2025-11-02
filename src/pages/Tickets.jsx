import React, { useState } from 'react';
import { useTickets } from '../hooks/useTickets';

const Tickets = () => {
  const { tickets, loading, error, createTicket, deleteTicket } = useTickets();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM'
  });

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    const result = await createTicket(newTicket);
    if (result.success) {
      setShowCreateForm(false);
      setNewTicket({ title: '', description: '', priority: 'MEDIUM' });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este ticket?')) {
      await deleteTicket(id);
    }
  };

  if (loading) return <div className="loading">Cargando tickets...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="tickets-page">
      <div className="page-header">
        <h1>Gestión de Tickets</h1>
        <button 
          className="btn-primary"
          onClick={() => setShowCreateForm(true)}
        >
          + Nuevo Ticket
        </button>
      </div>

      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Crear Nuevo Ticket</h3>
            <form onSubmit={handleCreateTicket}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Título"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Descripción"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <select
                  value={newTicket.priority}
                  onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                >
                  <option value="LOW">Baja</option>
                  <option value="MEDIUM">Media</option>
                  <option value="HIGH">Alta</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit">Crear</button>
                <button type="button" onClick={() => setShowCreateForm(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="tickets-list">
        {tickets.length === 0 ? (
          <p>No hay tickets creados.</p>
        ) : (
          tickets.map(ticket => (
            <div key={ticket.id} className="ticket-card">
              <h3>{ticket.title}</h3>
              <p>{ticket.description}</p>
              <div className="ticket-meta">
                <span className={`priority ${ticket.priority?.toLowerCase()}`}>
                  {ticket.priority}
                </span>
                <span className={`status ${ticket.status?.toLowerCase()}`}>
                  {ticket.status}
                </span>
                <button 
                  className="btn-danger"
                  onClick={() => handleDelete(ticket.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Tickets;
