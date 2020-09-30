$(function () {

  //JQUERY Selectors
  const $firstName = $("#firstname");
  const $lastName = $("#lastname");
  const $nickName = $("#nickname");
  const $talent = $("#talent");
  const $peeve = $("#peeve");
  const $food = $("#food");
  const $vehicle = $("#vehicle");
  const $tvShow = $("#tvshow");
  const $book = $("#book");

  const $teamDD = $("#inputTeam");
  const $updateProfile = $("#updateProfile");
  const $submitForm = $(".submitForm");
  let userID = $updateProfile.data("id");
  console.log("testing userID");
  console.log(userID);

  let talentID = $talent.attr("data-questionid");

  $updateProfile.data("id", userID);

  // // Update user answers to questions in database
  // const updateTalentAnswer = (userID) => {
  //   axios.put('/api/answer', {
  //     TeamMemberId: userID,
  //     QuestionId: talentID,
  //     answer: $talent.val().trim()
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  // }

  // Post Answers
  const addTalentAnswer = (userID) => {
    // let questionID = $firstName.attr("data-id");
    axios.post("/api/answer",
      {
        TeamMemberId: userID,
        QuestionId: talentID,
        answer: $talent.val().trim()

      }).then((response) => {
        console.log(response);
      })
  }

  const addPeeveAnswer = (userID) => {
    // let questionID = $firstName.attr("data-id");
    axios.post("/api/answer",
      {
        TeamMemberId: userID,
        QuestionId: $peeve.attr("data-questionid"),
        answer: $peeve.val().trim()

      }).then((response) => {
        console.log(response);
      })
  }


  const addFoodAnswer = (userID) => {
    // let questionID = $firstName.attr("data-id");
    axios.post("/api/answer",
      {
        TeamMemberId: userID,
        QuestionId: $food.attr("data-questionid"),
        answer: $food.val().trim()

      }).then((response) => {
        console.log(response);
      })
  }

  const addVehicleAnswer = (userID) => {
    // let questionID = $firstName.attr("data-id");
    axios.post("/api/answer",
      {
        TeamMemberId: userID,
        QuestionId: $vehicle.attr("data-questionid"),
        answer: $vehicle.val().trim()

      }).then((response) => {
        console.log(response);
      })
  }

  const addTVAnswer = (userID) => {
    // let questionID = $firstName.attr("data-id");
    axios.post("/api/answer",
      {
        TeamMemberId: userID,
        QuestionId: $tvShow.attr("data-questionid"),
        answer: $tvShow.val().trim()

      }).then((response) => {
        console.log(response);
      })
  }

  const addBookAnswer = (userID) => {
    // let questionID = $firstName.attr("data-id");
    axios.post("/api/answer",
      {
        TeamMemberId: userID,
        QuestionId: $book.attr("data-questionid"),
        answer: $book.val().trim()

      }).then((response) => {
        console.log(response);
      })
  }

  // Put/Update Answers

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


  // Add user answers to screen when refreshed
  const repopulateAnswerInfo = (userID) => {
    axios.get(`/api/userAnswers/${userID}`)
      .then((response) => {
        console.log(response);
        $talent.val(response.data[0].answer);
        $peeve.val(response.data[1].answer);
        $food.val(response.data[2].answer);
        $vehicle.val(response.data[3].answer);
        $tvShow.val(response.data[4].answer);
        $book.val(response.data[5].answer);
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
  repopulateAnswerInfo(userID);
  // console.log("User ID from getUser")
  getUser(userID);



  $submitForm.on("submit", function (event) {
    event.preventDefault();
    // let btnUserID = $firstName.attr("data-id");
    console.log("userID from save button");
    console.log(userID);

    addUserInfo(userID);

    //conditions for adding info to database

    // if ($talent.val()) {
    //   updateTalentAnswer(userID);
    //   console.log("should be updating!");
    // }
    // else {
    //   addTalentAnswer(userID);
    //   console.log("adding talent!")
    // }


    // updateTalentAnswer(userID);
    addTalentAnswer(userID);
    addPeeveAnswer(userID);
    addFoodAnswer(userID);
    addVehicleAnswer(userID);
    addTVAnswer(userID);
    addBookAnswer(userID);
    window.location.reload();

  });



});



