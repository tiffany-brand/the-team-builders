const { default: Axios } = require("axios");

$(function () {
    const saveNewTeamBtn = $("#saveNewTeamBtn");
    const newTeamName = $("#newTeamName");
    let newTeamVal;

    const addNewTeamName = () => {
        axios.post("/api/team", {
            name: newTeamVal
        }).then((response) => {
            console.log(response);
        })
    }

    saveNewTeamBtn.on("click", function() {
        newTeamVal = newTeamName.val().trim();
        addNewTeamName();
        
    })
})