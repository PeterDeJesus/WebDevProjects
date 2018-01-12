<?php

if($_GET) exit;
if($_POST) exit;

$pass = array('cs545', 'guesswho', 'tenfolds');

$salt='$5$R$4%&apbx)4_3wlg';

for($i=0; $i<count($pass); $i++)
	echo crypt($pass[$i],$salt)."\n";

?>
