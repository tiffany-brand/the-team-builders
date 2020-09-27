
const express = require('express');
const secured = require('../lib/middleware/secured');
const router = express.Router();
const db = require("../models");

/* GET user profile. */
router.get('/user', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  // get the currently logged in user and send user data to dashboard view
  db.TeamMember.findOne({
    where: {
      auth0_id: userProfile.id
    }
  }).then((teamMember) => {
    // send user data to user view
    const hbsObject = {
      user: {
        email: teamMember.email,
        picture: teamMember.picture,
        displayName: `${teamMember.first_name} ${teamMember.last_name}`,
        firstName: teamMember.first_name,
        lastName: teamMember.last_name,
        nickname: teamMember.nick_name,
        teamId: teamMember.TeamId
      }
    }
    res.render('user', hbsObject);
  }).catch(err => console.log(err));
});

module.exports = router;