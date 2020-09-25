const db = require("../models");

module.exports = function(app) {
  app.post("teamMember", function(req, res) {
    db.TeamMember.create({
      nick_name: req.body.nick_name,
      email: req.body.email,
      auth0_id: req.body.auth0_id,
      team_id: req.body.team_id,
      last_name: req.body.last_name,
      first_name: req.body.first_name
    })
      .then(function(dbTeamMember) {
        res.json(dbTeamMember);
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });
  app.get("/api/teamMember", function(req, res) {
    db.TeamMember.findAll({})
      .then(function(dbTeamMember) {
        res.json(dbTeamMember);
      });
  });
};