const express = require('express');
const secured = require('../lib/middleware/secured');
const router = express.Router();
const db = require("../models");

/* GET user profile. */
router.get('/dashboard', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  // get the currently logged in user and send user data to dashboard view
  db.TeamMember.findOne({
    where: {
      auth0_id: userProfile.id
    }
  }).then((teamMember) => {
    // get all team names
    db.Team.findAll({})
      .then((dbTeams) => {

        let teams = dbTeams.map((team) => {
          return { teamId: team.id, teamName: team.name }
        });


        // send user data to dashboard view
        const hbsObject = {
          user: {
            email: teamMember.email,
            picture: teamMember.picture,
            displayName: `${teamMember.first_name} ${teamMember.last_name}`,
            firstName: teamMember.first_name,
            lastName: teamMember.last_name,
            nickname: teamMember.nick_name,
            teamId: teamMember.TeamId,
            teams: teams
          },
          team: {
            teams: teams
          }
        }

        res.render('dashboard', hbsObject);
      });
  }).catch(err => console.log(err));
});

module.exports = router;