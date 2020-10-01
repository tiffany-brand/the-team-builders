$(function () {
  const saveNewTeamBtn = $("#saveNewTeamBtn");
  const newTeamName = $("#newTeamName");

  let newTeamVal;

  const addNewTeamName = () => {
    axios.post("/api/team", {
      name: newTeamVal
    }).then((response) => {
      console.log(response);
      window.location.reload();
    });
  };

  saveNewTeamBtn.on("click", function () {
    newTeamVal = newTeamName.val().trim();
    addNewTeamName();
    $("#createTeamModal").modal("hide");
  });
});
