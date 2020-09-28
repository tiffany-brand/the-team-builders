$(function () {

  function openPicker() {

    const options = {
      accept: ["image/*"],
      onFileUploadFinished: (file) => {
        console.log(file);

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