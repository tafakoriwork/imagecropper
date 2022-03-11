class Main {
  constructor() {
    const moving = {
      start: false,
    }
    this.closepopup();
    this.moveCropTool();
  }

  //close the popup
  closepopup() {
    $("closepopup").addEventListener("click", function () {
      $("popup").style.display = "none";
    });
  }

  

  
}

export default Main;
