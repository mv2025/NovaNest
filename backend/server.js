// server.js - NovaNest simple backend API (Node + Express)

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// --- Sample in-memory data (no database needed for prototype) ---

const residents = [
  { id: 1, name: 'Sarah', room: '101', role: 'resident', kWhToday: 3.1, points: 8 },
  { id: 2, name: 'John',  room: '102', role: 'resident', kWhToday: 4.7, points: 4 },
];

const devices = [
  { id: 'd1', name: 'Heater - Room 101', room: '101', kWhToday: 12.4, status: 'on' },
  { id: 'd2', name: 'Lamp - Lounge',     room: 'Lounge', kWhToday: 2.7, status: 'on' },
  { id: 'd3', name: 'Washer',            room: 'Utility', kWhToday: 8.3, status: 'off' },
];

const alerts = [
  { id: 1, room: 'Room 14', type: 'energy', message: 'High heater use detected' },
  { id: 2, room: 'Room 3',  type: 'comfort', message: 'Window open, room cooling' },
];

// Utility: calculate totals
function calculateSummary() {
  const totalDeviceKWh = devices.reduce((sum, d) => sum + d.kWhToday, 0);
  const totalResidentKWh = residents.reduce((sum, r) => sum + r.kWhToday, 0);

  return {
    totalDeviceKWh,
    totalResidentKWh,
    estimatedCost: Number((totalDeviceKWh * 0.12).toFixed(2)), // £0.12 per kWh
    residentCount: residents.length,
    deviceCount: devices.length,
    alertsCount: alerts.length,
  };
}

// --- Routes ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'NovaNest-backend', time: new Date().toISOString() });
});

// Get all residents
app.get('/api/residents', (req, res) => {
  res.json(residents);
});

// Get one resident by id
app.get('/api/residents/:id', (req, res) => {
  const id = Number(req.params.id);
  const resident = residents.find(r => r.id === id);
  if (!resident) {
    return res.status(404).json({ error: 'Resident not found' });
  }
  res.json(resident);
});

// Get all devices
app.get('/api/devices', (req, res) => {
  res.json(devices);
});

// Get alerts
app.get('/api/alerts', (req, res) => {
  res.json(alerts);
});

// High-level facility summary
app.get('/api/summary', (req, res) => {
  const summary = calculateSummary();
  res.json(summary);
});

// Start server
app.listen(PORT, () => {
  console.log(`NovaNest backend running on http://localhost:${PORT}`);
});
