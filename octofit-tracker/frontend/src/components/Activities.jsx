import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadActivities() {
      try {
        const response = await fetch(getApiBaseUrl('activities'));
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (active) {
          setActivities(normalizeCollection(payload));
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadActivities();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading activities…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h2 className="h5 mb-0">Activities</h2>
      </div>
      <div className="card-body">
        <div className="list-group">
          {activities.length === 0 ? (
            <div className="list-group-item text-muted">No activities available yet.</div>
          ) : (
            activities.map((activity) => (
              <div className="list-group-item" key={activity._id || activity.date}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="h6 mb-1">{activity.type || 'Activity'}</h3>
                    <div className="text-muted small">
                      {activity.userId?.name || 'User data unavailable'}
                    </div>
                  </div>
                  <span className="badge text-bg-secondary">{activity.durationMinutes || 0} min</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Activities;
