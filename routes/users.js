
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
    // get questions and answers for user
    db.Question.findAll({
      include: {
        model: db.Answer,
        where: {
          TeamMemberId: teamMember.id
        }
      }
    })
      .then(function (dbQuestions) {
        let userQa = dbQuestions.map((quest) => {
          return { questionId: quest.id, question: quest.question, answerId: quest.Answers[0].id, answer: quest.Answers[0].answer }
        })
        console.log(userQa)
        // send user data to user view
        const hbsObject = {
          user: {
            id: teamMember.id,
            email: teamMember.email,
            picture: teamMember.picture,
            displayName: `${teamMember.first_name} ${teamMember.last_name}`,
            firstName: teamMember.first_name,
            lastName: teamMember.last_name,
            nickname: teamMember.nick_name,
            teamId: teamMember.TeamId,
            userQa: userQa
          }
        }
        console.log(hbsObject);
        res.render('user', hbsObject);
      });
  }).catch(err => console.log(err));
});

module.exports = router;