<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title>SDSU Marathon: List of Participants</title>
    <link rel="stylesheet" type="text/css" href="login.css" >
</head>

<body>
	<!--Coded by Peter De Jesus
		Class Account: jadrn012
		CS545: Project 3
		Some of the following code had been adopted from jadrn000
	    -->
	<h1>SDSU Aztec Marathon Runner List</h1>
<?php

include('p3_helper.php');

$pass = $_POST['pword'];
$valid = false;

$raw = file_get_contents('passwords.dat');
//turn the password strings and put them in array
$data = explode("\n",$raw);
foreach($data as $item) {
	if(crypt($pass,$item)===$item)
		$valid = true;
}

if($valid) {
$runners = array(array());
$counter = 0;

$p_teen = false;
$p_adult = false;
$p_senior = false;

//images variables
$dir = 'lit_r_to/';
$comp_dir = '/home/jadrn012/public_html/proj3/lit_r_to/';

$db = get_db_handle();
$result = mysqli_query($db,"SELECT fname,lname,pic,experience,b_month,b_day,b_year,category FROM runner ORDER By
category='Senior', category='Adult', category='Teen',lname;");

if(mysqli_num_rows($result) > 0) {
	while($row = mysqli_fetch_assoc($result)) {
		$runners[$counter][0] = $row["lname"];
		$runners[$counter][1] = $row["fname"];
		$runners[$counter][2] = $row["pic"];
		$runners[$counter][3] = $row["experience"];
		$runners[$counter][4] = $row["b_month"];
		$runners[$counter][5] = $row["b_day"];
		$runners[$counter][6] = $row["b_year"];
		$runners[$counter][7] = $row["category"];
		$counter++;
	}
}
else {
echo "hello";
}
close_connector($db);

for ($x = 0; $x < $counter; $x++) {

    if($runners[$x][7] == "Teen" && $p_teen==false) {
    	echo "<h2>Teen Runners:</h2><hr>";
	$p_teen = true;
    }
    if($runners[$x][7] == "Adult" && $p_adult==false) {
    	echo "<h2>Adult Runners:</h2><hr>";
	$p_adult = true;
    }
    if($runners[$x][7] == "Senior" && $p_senior==false) {
    	echo "<h2>Senior Runners:</h2><hr>";
	$p_senior = true;
    }
    // Process and calculate runner's age
    date_default_timezone_set('America/Los_Angeles');
    $curr_date = getdate();
    $user_age = $curr_date['year'] - $runners[$x][6];
	    if($runners[$x][4] >= $curr_date['mon'])
	    	if($runners[$x][5] >= $curr_date['mday'])
			$user_age--;
	
    echo "<div><hr>";
    echo "<h4>Runner Name: ".$runners[$x][0].", ".$runners[$x][1]."</h4>";
    echo "<h4>Age: ".$user_age."</h4>";
    echo "<h4>Experience Level: ".$runners[$x][3]."</h4>";
    echo "<img src='$dir".$runners[$x][2]."' alt='no picture' width='200px' height='auto' />";
    echo "<hr></div>";
    /*
    echo $curr_date['mon'].$curr_date['mday'].$curr_date['year'];
    echo "<br />Birthdate: ".$runners[$x][4]."  ".$runners[$x][5]."  ".$runners[$x][6];
    echo "Name: ".$runners[$x][1]." ".$runners[$x][0];
    echo "Age: ".$user_age;
    echo "<hr><br />";
    */
}
}
else {
    echo "Login Unsuccessful<br />";
    echo "<a href='report.php'>Try Again</a>";
}

?>
</body>
</html>
