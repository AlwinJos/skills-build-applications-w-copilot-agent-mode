import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api.js';

// API endpoint: https://{codespace}-8000.app.github.dev/api/leaderboard
const ENDPOINT = 'leaderboard';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadLeaderboard() {
      try {
        const response = await fetch(getApiBaseUrl(ENDPOINT));
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (active) {
          setEntries(normalizeCollection(payload));
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h2 className="h5 mb-0">Leaderboard</h2>
      </div>
      <div className="card-body">
        <div className="list-group">
          {entries.length === 0 ? (
            <div className="list-group-item text-muted">No leaderboard entries yet.</div>
          ) : (
            entries.map((entry) => (
              <div className="list-group-item" key={entry._id || entry.rank}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h3 className="h6 mb-1">#{entry.rank || '—'} {entry.userId?.name || 'Unknown user'}</h3>
                    <div className="text-muted small">Score: {entry.score || 0}</div>
                  </div>
                  <span className="badge text-bg-warning">{entry.score || 0}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
