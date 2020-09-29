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
  console.log("testing userID");
  console.log(userID);

  $updateProfile.data("id", userID);

  // / Get User
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

  // // Get Team Names for the drop-down
  // const getTeams = () => {
  //   axios.get("/api/team")
  //     .then((response) => {

  //       // let option = $("<option>")
  //       let s = $("<option>").attr("value","-1").text("Team Selections");
  //       // let s = "<option value=\"-1\">Team Selections</option>";
  //       for (let i = 0; i < response.data.length; i++) {
  //         $teamDD.append($("<option>").attr("value",response.data[i].id).text(response.data[i].name))
  //         // s += `<option value=${response.data[i].id}>${response.data[i].name}</option>`;
  //       }

  //       $teamDD.html(s);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // Update user info to database
  const addUserInfo = (userID) => {
    const firstName = $firstName.val().trim();
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
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getTeams();
  repopulateUserInfo(userID);
  console.log("User ID from getUser")
  getUser(userID);
  


 $submitForm.on("submit", function (event) {
    event.preventDefault();
    // let btnUserID = $(this).data("id");
    let btnUserID = $firstName.attr("data-id");
    console.log("userID from save button");
    console.log(btnUserID);
    addUserInfo(btnUserID);

  });

  

});



