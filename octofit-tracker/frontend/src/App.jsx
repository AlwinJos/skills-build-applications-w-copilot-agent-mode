import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

function App() {
  return (
    <div className="container py-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
              <h1 className="h3 mb-1">OctoFit Tracker</h1>
              <p className="text-muted mb-0">
                Multi-tier fitness tracking with a React 19 presentation layer and an Express API.
              </p>
            </div>
            <div className="text-muted small">
              Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use the Codespaces public API URL.
            </div>
          </div>
          <nav className="nav nav-pills mt-3 flex-wrap">
            <Link className="nav-link" to="/users">Users</Link>
            <Link className="nav-link" to="/activities">Activities</Link>
            <Link className="nav-link" to="/teams">Teams</Link>
            <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
            <Link className="nav-link" to="/workouts">Workouts</Link>
          </nav>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
