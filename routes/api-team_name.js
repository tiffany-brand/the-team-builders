const db = require("../models");

module.exports = function(app) {
  app.post("/api/team", function(req, res) {
    db.Team.create({
      name: req.body.name
    })
      .then(function(dbTeam) {
        res.json(dbTeam);
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
  app.get("/api/team", function(req, res) {
    db.Team.findAll({})
      .then(function(dbTeam) {
        res.json(dbTeam);
      });
  });
};