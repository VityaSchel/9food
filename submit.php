<?php

if(hash("sha512", $_GET['password']) != "b536c7bb183c90f829d43bab82734d76d5e59b6531fcc6ca23c247abedcbd9518a80b81df2eebe6c27b5b8ae03615ac8547f84df4596def45432e1c08e4ecc8d"){ die('{"response":"incorrect"}'); }

$b1 = urldecode($_GET['b1']);
$b2 = urldecode($_GET['b2']);
$b3 = urldecode($_GET['b3']);

$b1 = str_replace(";","",$b1);
$b2 = str_replace(";","",$b2);
$b3 = str_replace(";","",$b3);

if($b1 == ""){ $b1 = "-"; }
if($b2 == ""){ $b2 = "-"; }
if($b3 == ""){ $b3 = "-"; }

file_put_contents("timestamp", time());
file_put_contents("ds.data", $b1.";".$b2.";".$b3);

$mysqli = new mysqli("localhost","9food","5b8ae036e6c27b1","9food");

$result = mysqli_query($mysqli, 'UPDATE `9food` SET `b1`=0,`b2`=0,`b3`=0,`voted`=0 WHERE `code`!=""');

print('{"response":"success"}');

?>
