// src/api/api.js
import raw from '../data/db2.json'

// Deep clone initial data so we can mutate in-memory
let state = {
  tickets: JSON.parse(JSON.stringify(raw.tickets || [])),
  users: JSON.parse(JSON.stringify(raw.users || []))
};

const delay = (ms = 250) => new Promise(res => setTimeout(res, ms));

const clone = (v) => JSON.parse(JSON.stringify(v));

const nextId = (collection) => {
  const max = collection.reduce((m, it) => Math.max(m, Number(it.id || 0)), 0);
  return max + 1;
};

async function getTickets() {
  await delay();
  // return newest first
  const list = state.tickets.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return clone(list);
}

// backwards-compatible: if called with no arg, returns list (some older code used getTicket())
async function getTicket(arg) {
  await delay();
  if (typeof arg === 'undefined') {
    return getTickets();
  }
  const id = Number(arg);
  const t = state.tickets.find(x => x.id === id) || null;
  return clone(t);
}

async function createTicket(payload) {
  await delay();
  const id = nextId(state.tickets);
  const now = new Date().toISOString();
  const ticket = {
    id,
    title: payload.title || `Ticket ${id}`,
    description: payload.description || '',
    status: payload.status || 'open',
    user_id: payload.user_id || null,
    assigned_to: payload.assigned_to ?? null,
    created_at: payload.created_at || now
  };
  state.tickets.push(ticket);
  return clone(ticket);
}

async function updateTicket(idArg, patch = {}) {
  await delay();
  const id = Number(idArg);
  const idx = state.tickets.findIndex(t => t.id === id);
  if (idx === -1) throw new Error('Ticket not found');
  // merge allowed fields
  const allowed = ['title', 'description', 'status', 'assigned_to'];
  allowed.forEach(k => {
    if (Object.prototype.hasOwnProperty.call(patch, k)) state.tickets[idx][k] = patch[k];
  });
  return clone(state.tickets[idx]);
}

async function deleteTicket(idArg) {
  await delay();
  const id = Number(idArg);
  const exists = state.tickets.some(t => t.id === id);
  state.tickets = state.tickets.filter(t => t.id !== id);
  return { success: exists };
}

async function getUsers() {
  await delay();
  return clone(state.users.slice().sort((a,b) => a.id - b.id));
}

async function updateUser(idArg, patch = {}) {
  await delay();
  const id = Number(idArg);
  const idx = state.users.findIndex(u => u.id === id);
  if (idx === -1) throw new Error('User not found');
  const allowed = ['username', 'email', 'role'];
  allowed.forEach(k => {
    if (Object.prototype.hasOwnProperty.call(patch, k)) state.users[idx][k] = patch[k];
  });
  return clone(state.users[idx]);
}

async function deleteUser(idArg) {
  await delay();
  const id = Number(idArg);
  const exists = state.users.some(u => u.id === id);
  state.users = state.users.filter(u => u.id !== id);
  // unassign tickets
  state.tickets = state.tickets.map(t => t.assigned_to === id ? { ...t, assigned_to: null } : t);
  return { success: exists };
}

// Export an object named `api` (your components import { api } from '../api/api')
export const api = {
  // tickets
  getTickets,
  getTicket,       // compatible: getTicket() => list, getTicket(id) => single
  createTicket,
  updateTicket,
  deleteTicket,
  // users
  getUsers,
  updateUser,
  deleteUser,

  // debug helper to reset state (useful for development)
  __reset: () => {
    state = {
      tickets: JSON.parse(JSON.stringify(raw.tickets || [])),
      users: JSON.parse(JSON.stringify(raw.users || []))
    };
  },
  __dump: () => clone(state)
};
