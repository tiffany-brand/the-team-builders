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
  const $submitForm = $(".submitForm");

  let userID = $updateProfile.data("id");

  $updateProfile.data("id", userID);


  // Get User Info
  const getUser = (userID) => {
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
  const addUserInfo = (userID) => {
    let firstName = $firstName.val().trim();
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
      })
  }

  // Add user info to screen when refreshed
  const repopulateUserInfo = (userID) => {
    axios.get(`/api/profile/${userID}`)
      .then((response) => {
        $firstName.val(response.data.first_name);
        $lastName.val(response.data.last_name);
        $nickName.val(response.data.nick_name);
        $teamDD.val(response.data.TeamId);
        // console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  getTeams();
  repopulateUserInfo(userID);
  getUser(userID);


// event listener on submit button
  $submitForm.on("submit", function (event) {
    event.preventDefault();

    const formData = new FormData($submitForm.get(0));
    const data = [];
    for (const [key, value] of formData.entries()) {
      data.push({questionId: key, value: value});
      console.log(value);
    }
    axios.post(`/api/answer/all/${userID}`, data).then(window.location.reload());


    addUserInfo(userID);

    

  });



});



