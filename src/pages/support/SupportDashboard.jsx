// SupportDashboard.jsx - Fixed with row selection
import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Table from '../../components/common/Table';
import { api } from '../../apis/ticket';
import EditModal from '../../components/common/EditModal';
import DeleteConfirm from '../../components/common/DeleteConfirm';
import TicketDetails from '../../components/common/TicketDetails';

export default function SupportDashboard() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null); // Fixed: renamed from 'selected'
  const [editTicket, setEditTicket] = useState(null);
  const [deleteTicket, setDeleteTicket] = useState(null);
  
  useEffect(() => {
    fetchAll();
  }, []);
  
  async function fetchAll() {
    const [t, u] = await Promise.all([api.getTickets(), api.getUsers()]);
    setTickets(t);
    setUsers(u);
  }
  
  const handleEdit = (ticket) => setEditTicket(ticket);
  const handleDelete = (ticket) => setDeleteTicket(ticket);
  
  // Fixed: Added row selection handler
  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
  };
  
  const saveEdit = async (patch) => {
    try {
      const updated = await api.updateTicket(editTicket.id, patch);
      setTickets(prev => prev.map(t => t.id === updated.id ? updated : t));
      setEditTicket(null);
      
      // Update selected ticket if it was the one being edited
      if (selectedTicket?.id === updated.id) {
        setSelectedTicket(updated);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update ticket');
    }
  };
  
  const confirmDelete = async () => {
    await api.deleteTicket(deleteTicket.id);
    setTickets(prev => prev.filter(t => t.id !== deleteTicket.id));
    
    // Clear selection if the selected ticket was deleted
    if (selectedTicket?.id === deleteTicket.id) {
      setSelectedTicket(null);
    }
    
    setDeleteTicket(null);
  };
  
  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'title', title: 'Title' },
    { 
      key: 'description', 
      title: 'Description', 
      render: (t) => (
        <div className="max-w-80 whitespace-nowrap overflow-hidden text-ellipsis">
          {t.description}
        </div>
      )
    },
    { key: 'created_at', title: 'Created', render: (t) => new Date(t.created_at).toLocaleString() },
    { key: 'assigned_to', title: 'Assigned', render: (t) => t.assigned_to ?? '—' },
  ];
  
  return (
    <DashboardLayout title="Support Dashboard">
      <div className="grid gap-4">
        <div className="flex justify-between gap-3">
          <div>
            <button 
              onClick={fetchAll} 
              className="px-3 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Refresh
            </button>
          </div>
          <div>
            <input 
              placeholder="Search title..." 
              onChange={(e) => {
                const q = e.target.value.toLowerCase();
                if (!q) return fetchAll();
                setTickets(prev => prev.filter(t => t.title.toLowerCase().includes(q)));
              }} 
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        {/* Fixed: Added onSelect prop and selectedItem prop */}
        <Table 
          items={tickets} 
          columns={columns} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          onSelect={handleSelectTicket}
          selectedItem={selectedTicket}
        />
        
        <div>
          <h3 className="mb-2">Selected ticket</h3>
          {!selectedTicket && (
            <div className="text-slate-500 italic">Click on a row above to select a ticket</div>
          )}
          <TicketDetails ticket={selectedTicket} />
        </div>
      </div>
      
      <EditModal 
        open={!!editTicket} 
        onClose={() => setEditTicket(null)} 
        ticket={editTicket} 
        users={users} 
        onSave={saveEdit} 
      />
      <DeleteConfirm 
        open={!!deleteTicket} 
        onClose={() => setDeleteTicket(null)} 
        onConfirm={confirmDelete} 
        itemName="ticket" 
      />
    </DashboardLayout>
  );
}