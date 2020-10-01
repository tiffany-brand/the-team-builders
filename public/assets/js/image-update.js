$(function () {
  // function to open the Filestack image picker widget
  function openPicker(apiKey) {

    const options = {
      accept: ["image/*"],
      onFileUploadFinished: (file) => {
        // when image is uploaded update the database with new image url
        axios.put("/api/profile",
          {
            id: userId,
            picture: file.url
          })
          .then(() => {
            // send user back to user profile page
            window.location.replace("/user");
          }).catch((err) => console.log(err));
      }
    };
    // initialize the filestack client with the apiKey and open the picker
    const client = filestack.init(apiKey);
    client.picker(options).open();
  }

  const $imgBtn = $("#imgPicker");
  const userId = $("#userImg").attr("data-userId");

  // update image button click handler
  $imgBtn.on("click", function () {
    // retrieve apiKey from server to use Filestack
    axios.get("/api/filestack").then((apiKey) => {
      openPicker(apiKey.data);
    }).catch((err) => console.log(err));
  });
});