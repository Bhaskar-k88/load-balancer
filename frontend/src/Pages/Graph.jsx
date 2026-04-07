import { useEffect, useState } from "react";
import axios from "axios";
import RequestChart from "../Components/RequestChart";
import { useNavigate } from "react-router-dom";

function Graph() {
  const [stats, setStats] = useState({});

  const navigate = useNavigate();

  const fetchStats = async () => {
    try {
      const res = await axios.get("http://localhost:4000/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div className="container">

    {/* 🔝 HEADER */}
    <div className="header">
      <h1 className="title">📊 Analytics Dashboard</h1>

      <button className="btn" onClick={() => navigate("/")}>
        ⬅ Back to Dashboard
      </button>
    </div>

    {/* 📊 CHART CARD */}
    <div className="grid">
      <div className="card" style={{ width: "700px" }}>
        <h2>Request Distribution</h2>
        <RequestChart stats={stats} />
      </div>
    </div>

  </div>
);
}

export default Graph;