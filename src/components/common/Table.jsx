// Table.jsx - Fixed to support row selection
import React from 'react';
import TableRow from './TableRow';

export default function Table({ items = [], columns = [], onEdit, onDelete, onSelect, selectedItem }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-slate-100">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="text-left px-4 py-3 text-xs text-slate-700">
                {col.title}
              </th>
            ))}
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={columns.length + 1} className="p-4 text-slate-500">No items</td>
            </tr>
          )}
          {items.map(item => (
            <TableRow 
              key={item.id} 
              item={item} 
              columns={columns} 
              onEdit={onEdit} 
              onDelete={onDelete}
              onSelect={onSelect}
              isSelected={selectedItem?.id === item.id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}