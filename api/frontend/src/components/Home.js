import React, { useState, useEffect } from 'react';
import { healthApi } from '../services/api';

function Home() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await healthApi.getHealth();
        setHealth(response.data);
      } catch (err) {
        setError('Failed to fetch health status');
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Welcome to Rails + React App</h2>
      <div className="health-status">
        <h3>API Health Status</h3>
        {health && (
          <div>
            <p>Status: {health.status}</p>
            <p>Version: {health.version}</p>
            <p>Timestamp: {health.timestamp}</p>
          </div>
        )}
      </div>
      <div className="description">
        <p>This is a full-stack application with:</p>
        <ul>
          <li>Rails API backend</li>
          <li>React frontend</li>
          <li>Docker containerization</li>
          <li>Coolify deployment ready</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;