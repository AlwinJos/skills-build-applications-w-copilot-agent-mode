import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadWorkouts() {
      try {
        const response = await fetch(getApiBaseUrl('workouts'));
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        if (active) {
          setWorkouts(normalizeCollection(payload));
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading workouts…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h2 className="h5 mb-0">Workouts</h2>
      </div>
      <div className="card-body">
        <div className="list-group">
          {workouts.length === 0 ? (
            <div className="list-group-item text-muted">No workouts available yet.</div>
          ) : (
            workouts.map((workout) => (
              <div className="list-group-item" key={workout._id || workout.name}>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h3 className="h6 mb-1">{workout.name || 'Workout'}</h3>
                    <div className="text-muted small">{workout.focusArea || 'Focus area pending'}</div>
                  </div>
                  <span className="badge text-bg-success">{workout.durationMinutes || 0} min</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
