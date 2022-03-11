<?php
if (isset($_GET['delete_image'])) {
    unlink('../'.$_POST['processed_image_name']);
} else {
    $cropping_size = json_decode($_POST['cropping_size'], true);
    $file = $_FILES['file'];
    $name = "image_" . time();
    //image
    $tmp_image = "../assets/processed/{$name}.jpg";
    move_uploaded_file($file['tmp_name'], $tmp_image);
    $image_code = file_get_contents($tmp_image);
    $image = imagecreatefromstring(file_get_contents($tmp_image));
    $size = getimagesize($tmp_image);
    $res =  $size[0] / 1000;
    $processed_image = imagecrop($image, [
        "x" => $cropping_size['x'] * $res,
        "y" => $cropping_size['y'] * $res,
        "width" => $cropping_size['width'] * $res,
        "height" => $cropping_size['height'] * $res,
    ]);
    $processed_name = "{$name}_processed.jpg";
    imagejpeg($processed_image, "../assets/processed/{$processed_name}");
    unlink($tmp_image);
    echo json_encode(['processed' => $processed_name]);
}
