const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Response from Server 2");
});

router.get("/fail", (req, res) => {
  res.status(500).send("Server 2 failed");
});

module.exports = router;