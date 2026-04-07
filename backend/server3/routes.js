const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Response from Server 3");
});

router.get("/fail", (req, res) => {
  res.status(500).send("Server 3 failed");
});

router.get("/health", (req, res) => {
  res.status(200).send("OK");
});

module.exports = router;