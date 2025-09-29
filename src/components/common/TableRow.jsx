import React from 'react';

export default function TableRow({ item, columns, onEdit, onDelete, onSelect, isSelected }) {
    const getStatusStyles = (status) => {
        const styles = {
            open: 'bg-red-500',
            'in-progress': 'bg-amber-500',
            resolved: 'bg-emerald-500',
            closed: 'bg-gray-500',
            Available: "bg-emerald-500",
            Away:  'bg-gray-500'
        };
        return styles[status] || 'bg-slate-700';
    };

    return (
        <tr
            className={`border-b border-slate-200 cursor-pointer hover:bg-slate-50 ${isSelected ? 'bg-blue-50 border-blue-200' : ''}`}
            onClick={() => onSelect && onSelect(item)}
        >
            {columns.map(col => (
                <td key={col.key} className="px-4 py-3 align-top">
                    {col.render ? col.render(item) : item[col.key]}
                </td>
            ))}
            <td className="px-4 py-3">
                <div className="flex gap-2 items-center">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onEdit(item);
                        }}
                        className="px-2.5 py-1.5 border-none cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(item);
                        }}
                        className="px-2.5 py-1.5 border border-slate-200 cursor-pointer bg-white rounded-md hover:bg-red-50 hover:border-red-200 transition-colors"
                    >
                        Delete
                    </button>
                    <div className="ml-auto flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs text-white ${getStatusStyles(item.status)}`}>
                            {item.status}
                        </span>
                    </div>
                </div>
            </td>
        </tr>
    );
}