$(function () {
    const saveNewTeamBtn = $("#saveNewTeamBtn");
    const newTeamName = $("#newTeamName");
    const viewTeams = $("#viewTeams");

    let newTeamVal;

    const addNewTeamName = () => {
        axios.post("/api/team", {
            name: newTeamVal
        }).then((response) => {
            console.log(response);
        })
    }

    // const viewAllTeams = () => {
    //     axios.get("/api/team", {
            
    //     })
    // }

    saveNewTeamBtn.on("click", function() {
        newTeamVal = newTeamName.val().trim();
        addNewTeamName();
        
    })
})