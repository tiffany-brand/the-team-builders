const db = require("../models");

module.exports = function(app) {
  app.post("/api/answer", function(req, res) {
    db.Answer.create({
      member_id: req.body.member_id,
      question_id: req.body.question_id,
      answer: req.body.answer
    })
      .then(function(dbAnswer) {
        res.json(dbAnswer);
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
  app.get("/api/answer", function(req, res) {
    db.Answer.findAll({})
      .then(function(dbAnswer) {
        res.json(dbAnswer);
      });
  });
};