import { useState, useEffect } from 'react';
import { ticketService } from '../services/api';

export const useTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ticketService.getAllTickets();
      setTickets(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar tickets');
    } finally {
      setLoading(false);
    }
  };

  const createTicket = async (ticketData) => {
    try {
      const response = await ticketService.createTicket(ticketData);
      setTickets(prev => [response.data, ...prev]);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al crear ticket';
      return { success: false, error: errorMsg };
    }
  };

  const updateTicket = async (id, ticketData) => {
    try {
      const response = await ticketService.updateTicket(id, ticketData);
      setTickets(prev => 
        prev.map(ticket => ticket.id === id ? response.data : ticket)
      );
      return { success: true, data: response.data };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al actualizar ticket';
      return { success: false, error: errorMsg };
    }
  };

  const deleteTicket = async (id) => {
    try {
      await ticketService.deleteTicket(id);
      setTickets(prev => prev.filter(ticket => ticket.id !== id));
      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error al eliminar ticket';
      return { success: false, error: errorMsg };
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return {
    tickets,
    loading,
    error,
    fetchTickets,
    createTicket,
    updateTicket,
    deleteTicket
  };
};
