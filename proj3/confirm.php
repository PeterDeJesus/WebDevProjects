<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Registration Form</title>
    <link rel="stylesheet" type="text/css" href="regform.css" />
</head>
<body>
<?php
echo <<<ENDBLOCK
	<h1>Success! Thank You for Registering</h1>
	<h3>Here is the information you provided</h3>
	<div id="confirm_table">
	<table>
	   <tr>
		<td>First Name: </td>
		<td>$params[0]</td>
	   </tr>
           <tr>
                <td>Middle Name: </td>
                <td>$params[1]</td>
           </tr>
           <tr>
                <td>Last Name: </td>
                <td>$params[2]</td>
           </tr>
           <tr>
                <td>Address 1: </td>
                <td>$params[3]</td>
           </tr>
           <tr>
                <td>Address 2: </td>
                <td>$params[4]</td>
           </tr>
           <tr>
                <td>City: </td>
                <td>$params[5]</td>
           </tr>
           <tr>
                <td>State: </td>
                <td>$params[6]</td>
           </tr>
           <tr>
                <td>Zipcode: </td>
                <td>$params[7]</td>
           </tr>
           <tr>
                <td>Phone Number: </td>
                <td>$params[8]</td>
           </tr>
           <tr>
                <td>Email: </td>
                <td>$params[9]</td>
           </tr>
           <tr>
                <td>Gender: </td>
                <td>$params[10]</td>
           </tr>
           <tr>
                <td>Date of Birth: </td>
                <td>$params[18]</td>
           </tr>
           <tr>
                <td>Medical Condition: </td>
                <td>$params[14]</td>
           </tr>
           <tr>
                <td>Experience: </td>
                <td>$params[15]</td>
           </tr>
           <tr>
                <td>Category: </td>
                <td>$params[16]</td>
           </tr>
           <tr>
                <td>Picture Filename: </td>
                <td>$params[17]</td>
           </tr>

	</table>
		</div>
ENDBLOCK;
?>
</body>

</html>
