const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/api/answer", function (req, res) {
  db.Answer.create({
    TeamMemberId: req.body.TeamMemberId,
    QuestionId: req.body.QuestionId,
    answer: req.body.answer
  })
    .then(function (dbAnswer) {
      res.json(dbAnswer);
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

router.get("/api/answer", function (req, res) {
  db.Answer.findAll({})
    .then(function (dbAnswer) {
      res.json(dbAnswer);
    });
});

// Gets all answers for a single question by the question id
router.get("/api/singleQuestion/:questionId", function (req, res) {
  db.Answer.findAll({
    where: {
      QuestionId: req.params.questionId
    }
  })
    .then(function (dbAnswer) {
      res.json(dbAnswer);
    });
});

// Get answers to all questions by team member id
router.get("/api/userAnswers/:teamMemberId", function (req, res) {
  db.Answer.findAll({
    where: {
      TeamMemberId: req.params.teamMemberId
    }
  })
    .then(function (dbAnswer) {
      res.json(dbAnswer);
    });
});

// Gets all answers for a single question by the question id for a team
router.get("/api/singleQuestion/:questionId/:teamId", function (req, res) {
  db.Answer.findAll({
    where: {
      QuestionId: req.params.questionId
    },
    include: [{
      model: db.TeamMember,
      where: { teamId: req.params.teamId }
    }]
  })
    .then(function (dbAnswer) {
      res.json(dbAnswer);
    });
});

// Update the answer for one user/one question
router.put("/api/answer", function (req, res) {
  db.Answer.update(req.body, {
    where: {
      id: req.body.id
    }
  })
    .then(function (dbAnswer) {
      res.json(dbAnswer);
    });
});

module.exports = router;