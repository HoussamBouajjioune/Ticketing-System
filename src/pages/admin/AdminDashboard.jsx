import React, { useEffect, useState } from 'react';
import AdminDashboardLayout from '../../components/layout/AdminDashboardLayout'
import { api } from '../../apis/ticket';
import Table from '../../components/common/Table';
import EditModal from '../../components/common/EditModal';
import DeleteConfirm from '../../components/common/DeleteConfirm';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [editTicket, setEditTicket] = useState(null);
    const [deleteUser, setDeleteUser] = useState(null);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        fetchAll();
    }, []);

    async function fetchAll() {
        const [u, t] = await Promise.all([api.getUsers(), api.getTickets()]);
        setUsers(u);
        setTickets(t);
    }

    const handleUserDelete = (user) => setDeleteUser(user);

    const confirmUserDelete = async () => {
        if (!deleteUser) return;
        await api.deleteUser(deleteUser.id);
        setUsers(prev => prev.filter(u => u.id !== deleteUser.id));
        setDeleteUser(null);
        const fresh = await api.getTickets();
        setTickets(fresh);
    };

    const saveUserEdit = async (patch) => {
        const updated = await api.updateUser(editUser.id, patch);
        setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
        setEditUser(null);
    };

    const userColumns = [
        { key: 'id', title: 'ID' },
        { key: 'username', title: 'Username' },
        { key: 'email', title: 'Email' },
        { key: 'role', title: 'Role', render: (u) => <strong>{u.role}</strong> },
    ];

    // ticket columns for admin table (similar to support)
    const ticketColumns = [
        { key: 'id', title: 'ID' },
        { key: 'title', title: 'Title' },
        { key: 'status', title: 'Status' },
        {
            key: 'assigned_to', title: 'Assigned', render: (t) => {
                const assignedUser = users.find(u => u.id === t.assigned_to);
                return assignedUser ? `${assignedUser.username} (#${assignedUser.id})` : '—';
            }
        },
    ];

    const onEditTicket = (ticket) => setEditTicket(ticket);

    const saveTicketEdit = async (patch) => {
    const updated = await api.updateTicket(editTicket.id, patch);
    setTickets(prev => prev.map(t => t.id === updated.id ? updated : t));
    setEditTicket(null);
};


    return (
        <AdminDashboardLayout title="Admin Dashboard">
            <div className="grid gap-4">
                <section>
                    <h3>Users</h3>
                    <Table items={users} columns={userColumns} onEdit={(u) => setEditUser(u)}
                        onDelete={handleUserDelete} />
                </section>
                <section>
                    <h3>Tickets</h3>
                    <Table items={tickets} columns={ticketColumns} onEdit={onEditTicket} onDelete={(t) => console.log('delete ticket', t)} />
                </section>
            </div>
            <EditModal
                open={!!editTicket}
                onClose={() => setEditTicket(null)}
                ticket={editTicket}
                users={users}
                onSave={saveTicketEdit}
                mode="ticket"
            />
            <EditModal
                open={!!editUser}
                onClose={() => setEditUser(null)}
                user={editUser}
                onSave={saveUserEdit}
                mode="user"
            />

            <DeleteConfirm open={!!deleteUser} onClose={() => setDeleteUser(null)} onConfirm={confirmUserDelete} itemName="user" />
        </AdminDashboardLayout>
    );
}