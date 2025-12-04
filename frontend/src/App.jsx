import React, { useState, useEffect } from 'react';

// Simple warm & soft NovaNest front-end prototype (single-file React)
// - Three role views: Resident, Manager, Admin
// - Sample data included
// - Simple navigation

const sampleUsers = [
  { id: 1, name: 'Mridul', role: 'resident', kWh: 3.1, points: 8 },
  { id: 2, name: 'Rohit', role: 'resident', kWh: 4.7, points: 4 },
  { id: 3, name: 'Maloo', role: 'manager', kWh: 0, points: 0 }
]

const sampleDevices = [
  { id: 'd1', name: 'Heater - Room 101', kWh: 12.4 },
  { id: 'd2', name: 'Lamp - Lounge', kWh: 2.7 },
  { id: 'd3', name: 'Washer', kWh: 8.3 }
]

function Header({ role, setRole }) {
  return (
    <header className="header">
      <div className="brand">
        <div className="logo"></div>
        <div>
          <div className="title">NovaNest</div>
          <div className="subtitle">Comfort, Care, and Energy</div>
        </div>
      </div>
      <div className="role-switch">
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="resident">Resident</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </header>
  )
}

function ResidentView({ user }) {
  return (
    <div className="card">
      <h2>Welcome back, {user.name} 👋</h2>

      <div className="grid">
        <div className="info">
          <div className="label">Room Comfort</div>
          <div className="big">22°C — Comfortable</div>
          <div className="small">Air quality: Good</div>
        </div>

        <div className="info">
          <div className="label">Energy Today</div>
          <div className="big">{user.kWh} kWh</div>
          <div className="small">You used slightly less than yesterday — nice!</div>
        </div>

        <div className="info">
          <div className="label">Devices</div>
          <ul>
            <li>Lamp — On</li>
            <li>Heater — Off</li>
            <li>Window — Closed</li>
          </ul>
        </div>

        <div className="info">
        <div className="info">
        <div className="label">Rewards</div>
        <div className="big">{user.points} pts</div>
        <div className="small">Earn points for energy friendly actions</div>
        </div>
       </div>
      </div>

      <div className="tip">
        Tip: Turn off lights when you leave the room — small changes matter 💛
      </div>
    </div>
  )
}

function ManagerView({ users, devices }) {
  const total = devices.reduce((s, d) => s + d.kWh, 0).toFixed(1)
  const alerts = [
    { id: 1, room: 'Room 14', issue: 'High heater use' },
    { id: 2, room: 'Room 3', issue: 'Window open' }
  ]

  return (
    <div className="card">
      <h2>Facility Overview</h2>

      <div className="grid">
        <div className="info">
          <div className="label">Total Energy Today</div>
          <div className="big">{total} kWh</div>
          <div className="small">Estimated cost: £{(total * 0.12).toFixed(2)}</div>
        </div>

        <div className="info">
          <div className="label">Rooms Requiring Attention</div>
          <ul>
            {alerts.map((a) => (
              <li key={a.id}>
                {a.room} — {a.issue}
              </li>
            ))}
          </ul>
        </div>

        <div className="info">
          <div className="label">Top Devices</div>
          <ol>
            {devices.map((d) => (
              <li key={d.id}>
                {d.name} — {d.kWh} kWh
              </li>
            ))}
          </ol>
        </div>

        <div className="info">
          <div className="label">Residents</div>
          <ul>
            {users
              .filter((u) => u.role === 'resident')
              .map((r) => (
                <li key={r.id}>
                  {r.name} — {r.kWh} kWh — {r.points} pts
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="small">
        Quick action: Disable unused device schedules from Admin settings.
      </div>
    </div>
  )
}

function AdminView({ users }) {
  return (
    <div className="card">
      <h2>System Admin</h2>
      <div className="grid">
        <div className="info">
          <div className="label">System Health</div>
          <div className="big">All sensors online</div>
          <div className="small">Uptime: 98%</div>
        </div>

        <div className="info">
          <div className="label">User Management</div>
          <ul>
            {users.map((u) => (
              <li key={u.id}>
                {u.name} — {u.role}
              </li>
            ))}
          </ul>
        </div>

        <div className="info">
          <div className="label">Analytics</div>
          <div className="small">Weekly trends and export options (CSV)</div>
        </div>

        <div className="info">
          <div className="label">Configuration</div>
          <div className="small">
            Manage API keys, integrations and data retention
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [role, setRole] = useState('resident')

  // NEW STATE for backend summary
  const [summary, setSummary] = useState(null)

  // current user (only declare this ONCE)
  const currentUser = sampleUsers.find(u => u.role === role) || sampleUsers[0]

  // FETCH BACKEND DATA
  useEffect(() => {
    fetch("http://localhost:4000/api/summary")
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(err => console.log("API error:", err));
  }, []);

  return (
    <div className="app">
      <Header role={role} setRole={setRole} />
      <main>
        {role === 'resident' && <ResidentView user={currentUser} />}
        {role === 'manager' && (
          <ManagerView users={sampleUsers} devices={sampleDevices} />
        )}
        {role === 'admin' && <AdminView users={sampleUsers} />}
      </main>

      <footer className="footer">
        NovaNest prototype — friendly, warm UI for care-home energy insights
      </footer>
    </div>
  )
}

