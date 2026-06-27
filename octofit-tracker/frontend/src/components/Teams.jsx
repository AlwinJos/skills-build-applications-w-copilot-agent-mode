import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTeams() {
      try {
        const response = await fetch(getApiBaseUrl('teams'));
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (active) {
          setTeams(normalizeCollection(payload));
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadTeams();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading teams…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h2 className="h5 mb-0">Teams</h2>
      </div>
      <div className="card-body">
        <div className="list-group">
          {teams.length === 0 ? (
            <div className="list-group-item text-muted">No teams available yet.</div>
          ) : (
            teams.map((team) => (
              <div className="list-group-item" key={team._id || team.name}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="h6 mb-1">{team.name || 'Team'}</h3>
                    <div className="text-muted small">{team.sport || 'Sport pending'}</div>
                  </div>
                  <span className="badge text-bg-info">{team.members?.length || 0} members</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Teams;
