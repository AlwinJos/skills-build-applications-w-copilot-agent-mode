import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api.js';

// API endpoint: https://{codespace}-8000.app.github.dev/api/users
const ENDPOINT = 'users';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const response = await fetch(getApiBaseUrl(ENDPOINT));
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (active) {
          setUsers(normalizeCollection(payload));
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUsers();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading users…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h2 className="h5 mb-0">Users</h2>
      </div>
      <div className="card-body">
        <div className="list-group">
          {users.length === 0 ? (
            <div className="list-group-item text-muted">No users available yet.</div>
          ) : (
            users.map((user) => (
              <div className="list-group-item" key={user._id || user.email}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="h6 mb-1">{user.name || 'Unnamed user'}</h3>
                    <div className="text-muted small">{user.email}</div>
                  </div>
                  <span className="badge text-bg-primary">{user.fitnessGoal || 'Fitness'}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Users;
