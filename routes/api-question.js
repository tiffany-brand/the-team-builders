const db = require("../models");

module.exports = function(app) {
  app.post("/api/question", function(req, res) {
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
  app.get("/api/question", function(req, res) {
    db.Question.findAll({})
      .then(function(dbQuestion) {
        res.json(dbQuestion);
      });
  });
};