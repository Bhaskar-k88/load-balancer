const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// ALL SERVERS
const allServers = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003"
];

// ACTIVE SERVERS
let activeServers = [...allServers];
let current = 0;

const requestCount = {};

allServers.forEach(server => {
  requestCount[server] = 0;
});

const responseTime = {};

allServers.forEach(server => {
  responseTime[server] = 0;
});

// FAIL TRACKING
const failCount = {};
const MAX_FAIL = 3;

allServers.forEach(server => (failCount[server] = 0));


// 🔥 1️⃣ HEALTH CHECK (AUTO RECOVERY)
const checkHealth = async () => {
  const working = [];

  for (let server of allServers) {
    try {
      await axios.get(server + "/health");
      working.push(server);
    } catch (err) {
      console.log(`❌ Down: ${server}`);
    }
  }

  activeServers = working;
};

// run every 5 sec
setInterval(checkHealth, 9000);


// 🔥 2️⃣ SERVER STATUS API (FOR FRONTEND)
app.get("/servers", (req, res) => {
  res.json({
    active: activeServers,
    total: allServers
  });
});

app.get("/stats", (req, res) => {
  res.json(requestCount);
});

app.get("/response-time", (req, res) => {
  res.json(responseTime);
});

// 🔥 3️⃣ FORWARD REQUEST (ROUND ROBIN)
const forwardRequest = async (req, res) => {
  if (activeServers.length === 0) {
    return res.status(500).send("No servers available");
  }

  let attempts = 0;
  let server;

  while (attempts < activeServers.length) {
    server = activeServers[current];
    current = (current + 1) % activeServers.length;
    attempts++;

    try {
     const start = Date.now(); // 🔥 start time

  const response = await axios({
    method: req.method,
    url: server + req.originalUrl,
    headers: req.headers,
    ...(req.method !== "GET" && { data: req.body })
  });

  const end = Date.now(); // 🔥 end time

  // 🔥 store response time
  responseTime[server] = end - start;

  failCount[server] = 0;
  requestCount[server]++; // if you added earlier

  console.log(`➡️ ${server} responded in ${responseTime[server]} ms`);

  return res.send(response.data);

    } catch (err) {
      console.log(`❌ Server failed: ${server}`);
      failCount[server]++;

      if (failCount[server] >= MAX_FAIL) {
        console.log(`❌ Removing server: ${server}`);
        activeServers = activeServers.filter(s => s !== server);
      }
    }
  }

  return res.status(500).send("All servers failed");
};


// HANDLE ALL REQUESTS
app.use(forwardRequest);

app.listen(4000, () => {
  console.log("🚀 Load Balancer running on port 4000");
  console.log("✅ Active Servers:", activeServers);
});