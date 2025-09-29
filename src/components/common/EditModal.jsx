import React, { useState, useEffect } from 'react';

export default function EditModal({ 
    open, 
    onClose, 
    ticket, 
    user, 
    users = [], 
    onSave, 
    mode = 'ticket'
}) {
    const [form, setForm] = useState({});

    useEffect(() => {
        if (mode === 'ticket' && ticket) {
            setForm({
                title: ticket.title || '',
                description: ticket.description || '',
                status: ticket.status || 'open',
                assigned_to: ticket.assigned_to || null
            });
        }
        if (mode === 'user' && user) {
            setForm({
                username: user.username || '',
                email: user.email || '',
                role: user.role || 'support'
            });
        }
    }, [ticket, user, mode]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
            <div className="w-96 bg-white p-5 rounded-lg">
                <h3>{mode === 'ticket' ? 'Edit Ticket' : 'Edit User'}</h3>

                {mode === 'ticket' && (
                    <>
                        <div className="mt-3">
                            <label className="block text-xs">Title</label>
                            <input
                                value={form.title}
                                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                className="w-full p-2 mt-1.5 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mt-3">
                            <label className="block text-xs">Description</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                className="w-full p-2 mt-1.5 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="flex gap-3 mt-3">
                            <div>
                                <label className="block text-xs">Status</label>
                                <select
                                    value={form.status}
                                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                    className="p-2 mt-1.5 border border-gray-300 rounded"
                                >
                                    <option value="open">open</option>
                                    <option value="in-progress">in-progress</option>
                                    <option value="resolved">resolved</option>
                                    <option value="closed">closed</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs">Assign to</label>
                                <select
                                    value={form.assigned_to ?? ''}
                                    onChange={e => setForm(f => ({ ...f, assigned_to: e.target.value ? Number(e.target.value) : null }))}
                                    className="p-2 mt-1.5 border border-gray-300 rounded"
                                >
                                    <option value="">— unassigned —</option>
                                    {users.filter(u => u.role === 'support').map(u => (
                                        <option key={u.id} value={u.id}>{u.username}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </>
                )}

                {mode === 'user' && (
                    <>
                        <div className="mt-3">
                            <label className="block text-xs">Username</label>
                            <input
                                value={form.username}
                                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                                className="w-full p-2 mt-1.5 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mt-3">
                            <label className="block text-xs">Email</label>
                            <input
                                type="email"
                                value={form.email}
                                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                                className="w-full p-2 mt-1.5 border border-gray-300 rounded"
                            />
                        </div>
                        <div className="mt-3">
                            <label className="block text-xs">Role</label>
                            <select
                                value={form.role}
                                onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                                className="w-full p-2 mt-1.5 border border-gray-300 rounded"
                            >
                                <option value="admin">admin</option>
                                <option value="support">support</option>
                                <option value="user">user</option>
                            </select>
                        </div>
                    </>
                )}

                <div className="mt-4 flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-2 border border-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(form)}
                        className="px-3 py-2 bg-green-600 text-white border-none rounded-md"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
