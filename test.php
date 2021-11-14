<?php
die();

$mysqli = new mysqli("localhost","9food","5b8ae036e6c27b1","9food");
mysqli_query($mysqli, "SET NAMES 'utf8'");
$result = mysqli_query($mysqli, 'SELECT `username` FROM `9food` WHERE `code`=888100');
if(mysqli_num_rows($result) == 0){ die('{"response":"fail"}'); }
mysqli_set_charset($mysqli, "utf-8");
while($row = mysqli_fetch_assoc($result)){
  print('{"response":"'.$row['username'].'"}');
}
mysqli_close($mysqli);

?>
