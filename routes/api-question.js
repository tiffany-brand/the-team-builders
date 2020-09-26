const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/api/question", function(req, res) {
  db.Question.create({
    question: req.body.question
  })
    .then(function(dbQuestion) {
      res.json(dbQuestion);
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});
router.get("/api/question", function(req, res) {
  db.Question.findAll({})
    .then(function(dbQuestion) {
      res.json(dbQuestion);
    });
});

module.exports = router;