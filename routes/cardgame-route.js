const express = require("express");
const path = require("path");
const router = express.Router();

router.get("/cardgame", function (req, res) {
  res.sendFile(path.join(__dirname + "/cardgame.html"));
});

module.exports = router;