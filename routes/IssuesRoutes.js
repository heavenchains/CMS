const express = require("express");
const router = express.Router();
const Issue = require("../models/Issue");

router.get("/", (req, res) => {
  res.send("issues");
});

module.exports = router;
