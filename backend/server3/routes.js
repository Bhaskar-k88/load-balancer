const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.send("Response from Server 3");
});

router.get("/fail", (req, res) => {
  res.status(500).send("Server 3 failed");
});

module.exports = router;