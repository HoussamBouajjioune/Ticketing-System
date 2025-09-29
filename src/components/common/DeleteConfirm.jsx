import React from "react";

export default function DeleteConfirm({ open, onClose, onConfirm, itemName = 'item' }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg w-96">
                <h3>Delete {itemName}?</h3> 
                <p className="text-slate-500">This action cannot be undone.</p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-2 border border-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-3 py-2 bg-red-500 text-white border-none rounded-md"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}