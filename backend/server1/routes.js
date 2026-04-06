const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Response from Server 1");
});

router.get("/fail", (req, res) => {
  res.status(500).send("Server 1 failed");
});

module.exports = router;