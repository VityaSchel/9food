<?php

$b1 = $_GET['b1'];
$b2 = $_GET['b2'];
$b3 = $_GET['b3'];
$code = $_GET['code'];

$m = '{"response":"fail","info":"ля какой я тут устанавливаю хэш функции паролей и завожу аккаунт для каждого отдельного скрипта, а ты меня решил обмануть на этапе ввода данных?"}';

preg_match_all("/^(0|1)$/m", $b1, $matches, PREG_SET_ORDER, 0);
if(count($matches) == 0) { die($m); }
preg_match_all("/^(0|1)$/m", $b2, $matches, PREG_SET_ORDER, 0);
if(count($matches) == 0) { die($m); }
preg_match_all("/^(0|1)$/m", $b3, $matches, PREG_SET_ORDER, 0);
if(count($matches) == 0) { die($m); }
preg_match_all("/^\d{6}$/m", $code, $matches, PREG_SET_ORDER, 0);
if(count($matches) == 0) { die($m); }

$mysqli = new mysqli("localhost","9food","5b8ae036e6c27b1","9food");
$result = mysqli_query($mysqli, 'SELECT `voted` FROM `9food` WHERE `code`='.$code);
$row = mysqli_fetch_assoc($result);
if($row['voted'] == 1){ die('{"response":"fail","info":"уже голосовал"}'); }
mysqli_query($mysqli, 'UPDATE `9food` SET `b1`='.$b1.', `b2`='.$b2.', `b3`='.$b3.', `voted`=1 WHERE `code`='.$code);
print('{"response":"success"}');
mysqli_close($mysqli);

?>
