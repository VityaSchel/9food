<?php

$code = $_GET['code'];
preg_match_all("/^\d{6}$/m", $code, $matches, PREG_SET_ORDER, 0);
if(count($matches) == 0) { die('{"response":"fail","info":"format"}'); }

$mysqli = new mysqli("localhost","9food","5b8ae036e6c27b1","9food");
mysqli_query($mysqli, "SET NAMES 'utf8'");
if($code == "363666"){ $code = "363333"; } // egor's correction
$result = mysqli_query($mysqli, 'SELECT * FROM `9food` WHERE `code`='.$code);
if(mysqli_num_rows($result) == 0){ die('{"response":"fail"}'); }
mysqli_set_charset($mysqli, "utf-8");
while($row = mysqli_fetch_assoc($result)){
  $username = $row['username'];
  $b1 = $row['b1'];
  $b2 = $row['b2'];
  $b3 = $row['b3'];
  print('{"response":"success","username":"'.$username.'","b1":'.$b1.',"b2":'.$b2.',"b3":'.$b3.',"voted":'.$row['voted'].'}');
}
mysqli_close($mysqli);

?>
