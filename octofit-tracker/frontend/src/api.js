export function getApiBaseUrl(resource) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const host = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  return `${host}/api/${resource}/`;
}

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const candidateKeys = ['results', 'items', 'data', 'users', 'activities', 'teams', 'workouts', 'leaderboard'];

  for (const key of candidateKeys) {
    const value = payload[key];

    if (Array.isArray(value)) {
      return value;
    }

    if (value && typeof value === 'object') {
      const nested = normalizeCollection(value);
      if (nested.length > 0) {
        return nested;
      }
    }
  }

  return [];
}
