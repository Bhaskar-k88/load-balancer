import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [servers, setServers] = useState({ active: [], total: [] });
  const [response, setResponse] = useState("");

  const [stats, setStats] = useState({});
  const [times, setTimes] = useState({});

  const navigate = useNavigate()

  const fetchStats = async () => {
  try {
    const res = await axios.get("http://localhost:4000/stats");
    setStats(res.data);
  } catch (err) {
    console.log(err);
  }
};

const fetchTimes = async () => {
  try {
    const res = await axios.get("http://localhost:4000/response-time");
    setTimes(res.data);
  } catch (err) {
    console.log(err);
  }
};

  // 🔥 Fetch server status
  const fetchServers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/servers");
      setServers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 Send request to LB
  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:4000/test");
      setResponse(res.data);
    } catch (err) {
      setResponse("Request failed");
    }
  };

  // 🔁 Auto refresh every 3 sec
  
  useEffect(() => {
  fetchServers();
  fetchStats();
  fetchTimes();

  const interval = setInterval(() => {
    fetchServers();
    fetchStats();
    fetchTimes();
  }, 3000);

  return () => clearInterval(interval);
}, []);

return (
  <div className="container">

    {/* 🔝 HEADER */}
    <div className="header">
      <h1 className="title">🚀 Load Balancer Dashboard</h1>

      <button className="btn" onClick={() => navigate("/graph")}>
        View Analytics 📊
      </button>
    </div>

    {/* 🧱 MAIN GRID */}
    <div className="grid">

      {/* 🖥️ SERVER STATUS */}
      <div className="card">
        <h2>🖥️ Server Status</h2>

        <h3>Active Servers</h3>
        <div className="list">
          {servers.active.length > 0 ? (
            servers.active.map((s, i) => (
              <div key={i} className="item active">
                ✅ {s}
              </div>
            ))
          ) : (
            <p>No active servers</p>
          )}
        </div>

        <h3>Down Servers</h3>
        <div className="list">
          {servers.total
            .filter((s) => !servers.active.includes(s))
            .length > 0 ? (
            servers.total
              .filter((s) => !servers.active.includes(s))
              .map((s, i) => (
                <div key={i} className="item down">
                  ❌ {s}
                </div>
              ))
          ) : (
            <p>No down servers</p>
          )}
        </div>
      </div>

      {/* 📊 REQUEST COUNT */}
      <div className="card">
        <h2>📊 Request Count</h2>
        <div className="list">
          {Object.entries(stats).length > 0 ? (
            Object.entries(stats).map(([server, count], i) => (
              <div key={i} className="item">
                {server}
                <span className="badge">{count}</span>
              </div>
            ))
          ) : (
            <p>No data yet</p>
          )}
        </div>
      </div>

      {/* ⏱️ RESPONSE TIME */}
      <div className="card">
        <h2>⏱️ Response Time</h2>
        <div className="list">
          {Object.entries(times).length > 0 ? (
            Object.entries(times).map(([server, time], i) => (
              <div key={i} className="item">
                {server}
                <span className="badge">{time} ms</span>
              </div>
            ))
          ) : (
            <p>No data yet</p>
          )}
        </div>
      </div>

    </div>

    {/* 🔥 ACTION SECTION */}
    <div className="action">
      <button className="btn" onClick={sendRequest}>
        Send Request
      </button>

      <div className="response-box">
        <strong>Response:</strong>
        <p>{response || "No response yet"}</p>
      </div>
    </div>

  </div>
);
}

export default Home;