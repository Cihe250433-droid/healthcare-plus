import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Dashboard API
export const getDashboardStats = () => api.get('/dashboard/stats');

// Patients API
export const getPatients = () => api.get('/patients');
export const createPatient = (data) => api.post('/patients', data);
export const updatePatient = (id, data) => api.put(`/patients/${id}`, data);
export const deletePatient = (id) => api.delete(`/patients/${id}`);

// Appointments API
export const getAppointments = () => api.get('/appointments');
export const createAppointment = (data) => api.post('/appointments', data);
export const updateAppointment = (id, data) =>
  api.put(`/appointments/${id}`, data);
export const deleteAppointment = (id) =>
  api.delete(`/appointments/${id}`);

// Billing / Subscriptions API
export const getSubscriptions = () => api.get('/subscriptions');
export const createSubscription = (data) =>
  api.post('/subscriptions', data);
export const updateSubscription = (id, data) =>
  api.put(`/subscriptions/${id}`, data);
export const deleteSubscription = (id) =>
  api.delete(`/subscriptions/${id}`);

export default api;