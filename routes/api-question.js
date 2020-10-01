const express = require("express");
const router = express.Router();
const db = require("../models");

// create a question
router.post("/api/question", function (req, res) {
  db.Question.create({
    question: req.body.question
  })
    .then(function (dbQuestion) {
      res.json(dbQuestion);
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

// find all questions
router.get("/api/question", function (req, res) {
  db.Question.findAll({})
    .then(function (dbQuestion) {
      res.json(dbQuestion);
    });
});

// find all questions for one team member
router.get("/api/userQuestions/:teamMemberId", function (req, res) {
  db.Question.findAll({
    include: {
      model: db.Answer,
      where: {
        TeamMemberId: req.params.teamMemberId
      }
    }
  })
    .then(function (dbQuestion) {
      res.json(dbQuestion);
    });
});

module.exports = router;