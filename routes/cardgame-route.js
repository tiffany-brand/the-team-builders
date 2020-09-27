const express = require("express");
const path = require("path");
const router = express.Router();

// router.get("/cardgame", function (req, res) {
//   res.sendFile(path.join(__dirname + "/cardgame-route"));
// });


router.get("/cardgame", function (req, res) {
  res.render("cardgame");
});

module.exports = router;