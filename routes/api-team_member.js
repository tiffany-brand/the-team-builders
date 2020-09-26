const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/api/teamMember", function (req, res) {
  db.TeamMember.create({
    nick_name: req.body.nick_name,
    email: req.body.email,
    auth0_id: req.body.auth0_id,
    TeamId: req.body.TeamId,
    last_name: req.body.last_name,
    first_name: req.body.first_name
  })
    .then(function (dbTeamMember) {
      res.json(dbTeamMember);
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});
router.get("/api/teamMember", function (req, res) {
  db.TeamMember.findAll({})
    .then(function (dbTeamMember) {
      res.json(dbTeamMember);
    });
});

// Get team member profile by id
router.get("/api/profile/:id", function (req, res) {
  db.TeamMember.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(function (dbTeamMember) {
      res.json(dbTeamMember);
    });
});

// Get all members of a given team
router.get("/api/teamMember/:teamid", function (req, res) {
  db.TeamMember.findAll({
    where: {
      TeamId: req.params.teamid
    }
  })
    .then(function (dbTeamMember) {
      res.json(dbTeamMember);
    });
});

module.exports = router;
