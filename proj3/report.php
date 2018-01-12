<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>SDSU Marathon Runner Participant Report</title>
	<link rel="stylesheet" href="report.css">
</head>
<body>
	<h1>SDSU Marathon Runner Report Login</h1>
	<p>To see the list of participants, please login by entering 
		the password</p>
    <div id="logbox">
    <form method="post"
	  action="process_login.php"
	  name="log_in">

	Password: <input type="password" name="pword" size="25" /><br />
	<input type="submit" value="log In" />
    </form>
    </div>

</body>

</html>
