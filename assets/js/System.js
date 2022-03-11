function System() {
  //closepopup
  $("closepopup").addEventListener("click", function () {
    $("popup").style.display = "none";
  });
  this.choose = function (e) {
    $("image_select").onchange = (e) => {
      const files = e.target.files;
      window.FileForCrop = files[0];
      const imageBefore = URL.createObjectURL(files[0]);
      $("image_before").style.backgroundImage = `url('${imageBefore}')`;
      $("image_before_popup").style.backgroundImage = `url('${imageBefore}')`;
      $("popup_size_fixer").src = `${imageBefore}`;
      $("popup").style.display = "grid";
    };
    $("image_select").click();
  };

  this.reset = function () {
    location.reload();
  };
}

export default System;
