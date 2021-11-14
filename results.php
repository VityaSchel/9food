<?php

if(hash("sha512", $_GET['password']) != "b536c7bb183c90f829d43bab82734d76d5e59b6531fcc6ca23c247abedcbd9518a80b81df2eebe6c27b5b8ae03615ac8547f84df4596def45432e1c08e4ecc8d"){ die('{"response":"incorrect"}'); }

$mysqli = new mysqli("localhost","9food","5b8ae036e6c27b1","9food");

$result = mysqli_query($mysqli, 'SELECT count(code) AS code FROM 9food');
$row = mysqli_fetch_assoc($result);
$a = $row['code'];

$result = mysqli_query($mysqli, 'SELECT count(b1) AS b1 FROM 9food WHERE b1=0');
$row = mysqli_fetch_assoc($result);
$b1=$a-$row['b1'];

$result = mysqli_query($mysqli, 'SELECT count(b2) AS b2 FROM 9food WHERE b2=0');
$row = mysqli_fetch_assoc($result);
$b2=$a-$row['b2'];

$result = mysqli_query($mysqli, 'SELECT count(b3) AS b3 FROM 9food WHERE b3=0');
$row = mysqli_fetch_assoc($result);
$b3=$a-$row['b3'];

$result = mysqli_query($mysqli, 'SELECT count(voted) AS voted FROM 9food WHERE voted=1');
$row = mysqli_fetch_assoc($result);
$v=$row['voted'];

$perc = ($v*100)/$a;
print('{"response":"success","b1":'.$b1.',"b2":'.$b2.',"b3":'.$b3.',"voted":'.$v.',"perc":"'.$perc.'"}');

mysqli_close($mysqli);

?>
