const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/api/answer", function(req, res) {
  db.Answer.create({
    TeamMemberId: req.body.TeamMemberId,
    QuestionId: req.body.QuestionId,
    answer: req.body.answer
  })
    .then(function(dbAnswer) {
      res.json(dbAnswer);
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});
router.get("/api/answer", function(req, res) {
  db.Answer.findAll({})
    .then(function(dbAnswer) {
      res.json(dbAnswer);
    });
});

module.exports = router;