import CropTool from "./CropTool.js";
import System from "./System.js";

window.$ = (...args) => document.getElementById(...args);
const system = new System();
//choose image
$("choose_image").addEventListener("click", system.choose);
//reset all
$("reset").addEventListener("click", system.reset);
const cropTool = new CropTool(system.files);
//open popup again
$("image_before").addEventListener("click", function () {
  $("popup").style.display = "grid";
});
//send to cropping
$("accept_crop").addEventListener("click", function () {
  cropTool.sendToCropping();
});
//save processed image
$("save_processed_image").addEventListener('click', cropTool.saveProcessedImage);