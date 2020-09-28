$(function () {

  //JQUERY Selectors
  const $firstName = $("#firstname");
  const $lastName = $("#lastname");
  const $nickName = $("#nickname");
  // const $talent = $("#talent");
  // const $peeve = $("#peeve");
  // const $food = $("#food");
  // const $vehicle = $("#vehicle");
  // const $tvShow = $("#tvshow");
  // const $book = $("#book");
  const $teamDD = $("#inputTeam");
  const $updateProfile = $("#updateProfile");
  // const $userForm = $("#userForm");
  let userID = $firstName.data("id");
  console.log(userID);

  // / Get User ID
  const getUserID = (userID) => {
    axios.get(`/api/profile/${userID}`).then((response) => {
      console.log(response.data);
      userID = response.data;
    });
  };

  // Get Team Names for the drop-down
  const getTeams = () => {
    axios.get("/api/team")
      .then((response) => {

        let s = "<option value=\"-1\">Team Selections</option>";
        for (let i = 0; i < response.data.length; i++) {
          s += `<option value=${response.data[i].id}>${response.data[i].name}</option>`;
        }

        $teamDD.html(s);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Update user info to database
  const addUserInfo = () => {
    axios.put(`/api/profile/${userID}`, {
      first_name: $firstName.val().trim(),
      last_name: $lastName.val().trim(),
      nick_name: $nickName.val().trim()
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // Add user info to screen when refreshed
  const repopulateUserInfo = () => {
    axios.get(`/api/profile/${userID}`)
      .then((response) => {
        $firstName.val(response.data.first_name);
        $lastName.val(response.data.last_name);
        $nickName.val(response.data.nick_name);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  repopulateUserInfo();
  getUserID(userID);
  getTeams();

  $updateProfile.on("submit", function (event) {
    event.preventDefault();
    addUserInfo();

  });

});



