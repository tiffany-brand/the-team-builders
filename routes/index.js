const express = require("express");
const router = express.Router();

// might need these later
// const userInViews = require("../lib/middleware/userInViews");
// const db = require("../models");

router.get("/", function (req, res) {
  res.render("index", { user: req.user });
});



module.exports = router;