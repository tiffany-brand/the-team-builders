$(function () {

  function openPicker() {

    const options = {
      accept: ["image/*"],
      onFileUploadFinished: (file) => {
        console.log(file);
        axios.put("/api/profile",
          {
            id: user,
            picture: file.url
          }).then(() => {
            window.location.replace("/user");
          }).catch((err) => console.log(err));

      }
    };

    const client = filestack.init(apiKey);
    client.picker(options).open();
  }

  const $imgBtn = $("#imgPicker");

  $imgBtn.on("click", function () {
    openPicker();
  });

});