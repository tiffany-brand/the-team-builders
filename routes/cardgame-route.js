const express = require("express");
const router = express.Router();

// go to the card game 
router.get("/cardgame", function (req, res) {
  res.render("cardgame");
});

module.exports = router;