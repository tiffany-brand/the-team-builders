$(function () {

  //JQUERY Selectors
  const $firstName = $("#firstname");
  const $lastName = $("#lastname");
  const $nickName = $("#nickname");
  const $teamDD = $("#inputTeam");
  const $updateProfile = $("#updateProfile");
  const $submitForm = $(".submitForm");

  // get the user id and team id 
  let userID = $updateProfile.data("id");
  let teamID = $teamDD.data("teamid");

  // Get Team Names for the drop-down and select the current team
  const getTeams = () => {
    axios.get("/api/team")
      .then((response) => {
        let s = "<option value=\"-1\">Team Selections</option>";
        for (let i = 0; i < response.data.length; i++) {
          if (teamID === response.data[i].id) {
            s += `<option selected value=${response.data[i].id}>${response.data[i].name} </option>`;
          } else {
            s += `<option value=${response.data[i].id}>${response.data[i].name}</option>`;
          }
        }
        $teamDD.html(s);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Update user info in database
  const addUserInfo = (userID) => {
    let firstName = $firstName.val().trim();
    let currentTeamId = parseInt($teamDD.val());

    // check to see if a team is chosen before updating
    if (currentTeamId === -1) {

      axios.put("/api/profile", {
        id: userID,
        first_name: firstName,
        last_name: $lastName.val().trim(),
        nick_name: $nickName.val().trim() || firstName,
      })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {

      axios.put("/api/profile", {
        id: userID,
        first_name: firstName,
        last_name: $lastName.val().trim(),
        nick_name: $nickName.val().trim() || firstName,
        TeamId: $teamDD.val()
      })
        .then((response) => {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

  };

  // populate the teams dropdown
  getTeams();

  // event listener on submit button
  $submitForm.on("submit", function (event) {
    event.preventDefault();

    const formData = new FormData($submitForm.get(0));
    const data = [];
    for (const [key, value] of formData.entries()) {
      data.push({ questionId: key, value: value });
    }
    axios.post(`/api/answer/all/${userID}`, data).then(function () {
      window.location.reload();
    });

    addUserInfo(userID);
  });
});



