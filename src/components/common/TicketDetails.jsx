import React from "react";
export default function TicketDetails({ ticket }) {
    if (!ticket) return <div className="text-slate-500">No ticket selected</div>;

    return (
        <div className="bg-white p-4 rounded-lg">
            <h3 className="m-0 mb-2">{ticket.title}</h3>
            <p className="m-0 mb-2 text-slate-600">{ticket.description}</p>
            <div className="text-slate-400 text-xs">
                Created: {new Date(ticket.created_at).toLocaleString()} • Assigned to: {ticket.assigned_to || '—'}
            </div>
        </div>
    );
}