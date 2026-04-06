import React from "react";

export default function ServerStatus({ activeServers }) {
  return (
    <div>
      <h2>Active Servers</h2>
      {activeServers.length === 0 ? (
        <p>All servers down ❌</p>
      ) : (
        <ul>
          {activeServers.map((server, idx) => (
            <li key={idx}>✅ {server}</li>
          ))}
        </ul>
      )}
    </div>
  );
}