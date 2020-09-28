const express = require('express');
const secured = require('../lib/middleware/secured');
const router = express.Router();
const db = require("../models");

router.get("/image-update", secured(), function (req, res, next) {
    const { _raw, _json, ...userProfile } = req.user;
    // get the currently logged in user
    db.TeamMember.findOne({
        where: {
            auth0_id: userProfile.id
        }
    }).then((teamMember) => {
        const hbsObject = {
            user: {
                id: teamMember.id,
                picture: teamMember.picture,
                api_key: process.env.FILESTACK_APIKEY
            }
        }
        res.render("image-update", hbsObject);
    }).catch(err => console.log(err));

});

module.exports = router;