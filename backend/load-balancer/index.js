const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const allServers = [
  "http://localhost:3001",
  "http://localhost:3002",
  "http://localhost:3003"
];

let activeServers = [...allServers];
let current = 0;
const failCount = {};
const MAX_FAIL = 3;

allServers.forEach(server => (failCount[server] = 0));

const forwardRequest = async (req, res) => {
  if (activeServers.length === 0) return res.status(500).send("No servers available");

  let attempts = 0;
  let server;

  while (attempts < activeServers.length) {
    server = activeServers[current];
    current = (current + 1) % activeServers.length;
    attempts++;

    try {
      const response = await axios({
        method: req.method,
        url: server + req.originalUrl,
        headers: req.headers,
        ...(req.method !== "GET" && { data: req.body })
      });

      failCount[server] = 0;
      console.log(`➡️ Request sent to: ${server}`);
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

app.use(forwardRequest);

app.listen(4000, () => {
  console.log("Smart Load Balancer running on port 4000");
  console.log("✅ Active Servers:", activeServers);
}); 