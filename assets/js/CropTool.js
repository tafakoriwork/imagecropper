function CropTool() {
  moveCropTool();
  resizeCropTool();
  let processed_image_name;
  let moving = {
    is_start: false,
  };
  let resizing = {
    is_start: false,
  };
  let offset;
  let coordinate;
  //move crop tool
  function moveCropTool() {
    $("crop_tool").addEventListener("mousedown", function (e) {
      offset = [
        $("crop_tool").offsetLeft - e.clientX,
        $("crop_tool").offsetTop - e.clientY,
      ];
      moving.is_start = true;
      let imageCoordinate = $("image_before_popup").getBoundingClientRect();
      document.addEventListener("mousemove", function (e) {
        coordinate = $("crop_tool").getBoundingClientRect();
        if (moving.is_start) {
          if (
            e.clientX + offset[0] >= 0 &&
            e.clientX + offset[0] + coordinate.width <= imageCoordinate.width
          )
            $("crop_tool").style.left = `${e.clientX + offset[0]}px`;
          if (
            e.clientY + offset[1] >= 0 &&
            e.clientY + offset[1] + coordinate.height <= imageCoordinate.height
          )
            $("crop_tool").style.top = `${e.clientY + offset[1]}px`;
        }
      });
    });

    document.addEventListener("mouseup", function () {
      moving.is_start = false;
      resizing.is_start = false;
    });
  }

  //resize crop tool
  function resizeCropTool() {
    let croptool_bound;
    $("crop_tool_corner").addEventListener("mousedown", function (e) {
      let first_clientX = e.clientX;
      let first_clientY = e.clientY;
      resizing.is_start = true;
      croptool_bound = $("crop_tool").getBoundingClientRect();
      document.addEventListener("mousemove", function (e) {
        if (resizing.is_start) {
          moving.is_start = false;
          let diffX = first_clientX - e.clientX > 0 ? "plus" : "minus";
          let diffY = first_clientY - e.clientY > 0 ? "plus" : "minus";
          $("crop_tool").style.width =
            diffX === "plus"
              ? `${
                  croptool_bound.width + (e.clientX - first_clientX + 0.001)
                }px`
              : `${
                  croptool_bound.width + (e.clientX - first_clientX - 0.001)
                }px`;
          $("crop_tool").style.height =
            diffY === "plus"
              ? `${
                  croptool_bound.height + (e.clientY - first_clientY + 0.001)
                }px`
              : `${
                  croptool_bound.height + (e.clientY - first_clientY - 0.001)
                }px`;
        }
      });
    });
  }

  this.sendToCropping = function () {
    const croptool_bound = $("crop_tool").getBoundingClientRect();
    const imageCoordinate = $("image_before_popup").getBoundingClientRect();
    const croptool_width = croptool_bound.width;
    const croptool_height = croptool_bound.height;
    const cropping_size = {
      x: croptool_bound.left - imageCoordinate.left - 3,
      y: croptool_bound.top - imageCoordinate.top - 3,
      width: croptool_width,
      height: croptool_height,
    };
    const form = new FormData();
    form.append('cropping_size', JSON.stringify(cropping_size));
    if(FileForCrop)
      form.append('file', FileForCrop);
    fetch('/imagecroper/system/index.php', {
      method: 'POST',
      body: form,
    }).then(res => res.json())
    .then(result => {
      if(result.processed)
        {
          processed_image_name = `assets/processed/${result.processed}`;
          $("image_after").style.backgroundImage = `url(${processed_image_name})`;
          $("closepopup").click();
          $("processed_image_link") && $("processed_image_link").parentNode.removeChild($("processed_image_link"));
          const processed_image_link = document.createElement("a");
          processed_image_link.id = "processed_image_link";
          processed_image_link.href = `${processed_image_name}`;
          processed_image_link.style.display = "none";
          processed_image_link.download = true;
          document.body.appendChild(processed_image_link);
        }
    });
  }

  this.saveProcessedImage = function() {
    let form = new FormData();
    form.append("processed_image_name", processed_image_name);
    $("processed_image_link").click();
    fetch('/imagecroper/system/index.php?delete_image=true', {
      method: 'POST',
      body: form,
    }).then(res => res.json())
    .then(result => {
      console.log(result);
    })
  }
}

export default CropTool;
