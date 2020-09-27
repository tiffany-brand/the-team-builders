const express = require('express');
const secured = require('../lib/middleware/secured');
const router = express.Router();
const db = require("../models");

/* GET user profile. */
router.get('/dashboard', secured(), function (req, res, next) {
  const { _raw, _json, ...userProfile } = req.user;
  db.Post.findAll({}).then((result) => {
    let posts = result.map(row => {
      return row.dataValues
    });
    console.log(posts);
    const hbsObject = {
      user: {
        email: userProfile.emails[0].value,
        userProfile: JSON.stringify(userProfile, null, 2),
        picture: userProfile.picture,
        displayName: userProfile.displayName,
        nickname: userProfile.nickname,
        posts: posts
      }
    }
    res.render('dashboard', hbsObject);
  }).catch(err => console.log(err));
});

module.exports = router;