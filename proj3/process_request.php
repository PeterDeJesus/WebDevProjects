<?php
/* Coded by Peter De Jesus
   Class Account: jadrn012
   CS545 Project 3
   the following code had been adopted from jadrn000 */

include('p3_helper.php');
include('p3.php');

check_post_only();
$params = process_datas();
validate_data($params);
store_data_in_db($params);

include('confirm.php');
?>    
