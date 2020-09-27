const db = require("../models");

// This function checks to see if a user logging in with Auth0 has a
// profile in the team_members table
// If not, the team member is created and populated with whatever
// user information is in their Auth0 login

module.exports = function (userProfile) {
  db.TeamMember.findOne({
    where: {
      auth0_id: userProfile.id
    }
  }).then(function (dbTeamMember) {
    // if user is not in teammembers, add them
    if (!dbTeamMember) {
      db.TeamMember.create({
        auth0_id: userProfile.id,
        email: userProfile.emails[0].value,
        nick_name: userProfile.nickname ? userProfile.nickname : "Nickname",
        first_name: userProfile.name.givenName ? userProfile.name.givenName : "First Name",
        last_name: userProfile.name.familyName ? userProfile.name.familyName : "Last Name",
        picture: userProfile.picture
      }).then(function (result) {
        // after adding user, return result
        return result;
      }).catch(function (err) {
        return err;
      });
    } else {
      return;
    }
  });
};