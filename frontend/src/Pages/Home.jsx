import React, { useState, useEffect } from "react";
import axios from "axios";
// import ServerStatus from "../components/ServerStatus";
import ServerStatus from "../Components/ServerStatus";
import RequestButton from "../Components/RequestButton";
// import RequestButton from "../components/RequestButton";

const loadBalancerURL = "http://localhost:4000"; // Your load balancer

export default function Home() {
  const [activeServers, setActiveServers] = useState([]);
  const [response, setResponse] = useState("");

  // Fetch server status
  const fetchStatus = async () => {
    try {
      const res = await axios.get(`${loadBalancerURL}/test`);
      setResponse(res.data);
    } catch (err) {
      setResponse("Server request failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Load Balancer Frontend</h1>
      <ServerStatus activeServers={activeServers} />
      <RequestButton fetchStatus={fetchStatus} />
      <p>Response: {response}</p>
    </div>
  );
}