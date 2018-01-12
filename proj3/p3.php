<?php

/* Coded by Peter De Jesus
   Class Account: jadrn012
   CS545 Project 3
   The following code had been adopted from jadrn000 */

#$date_of_birth = "";

    $UPLOAD_DIR = 'lit_r_to/';
    $COMPUTER_DIR = '/home/jadrn012/public_html/proj3/lit_r_to/';
    $fname = $_FILES['pic']['name'];
    
    if($_FILES['pic']['error'] > 0) {
    	$err = $_FILES['pic']['error'];	
        //echo "Error Code: $err ";
	if($err == 1)
		echo "The file was too big to upload, the limit is 2MB<br />";
        } 
    elseif(exif_imagetype($_FILES['pic']['tmp_name']) != IMAGETYPE_JPEG) {
        echo "ERROR, not a jpg file<br />";   
        }
## file is valid, copy from /tmp to your directory.        
    else { 
        move_uploaded_file($_FILES['pic']['tmp_name'], "$UPLOAD_DIR".$fname);

    }
   

function process_datas($params) {
    global $bad_chars;
    $params = array();
    $params[] = trim(str_replace($bad_chars, "",$_POST['fname'])); // 0
    $params[] = trim(str_replace($bad_chars, "",$_POST['mname']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['lname'])); // 2
    $params[] = trim(str_replace($bad_chars, "",$_POST['address1']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['address2'])); // 4
    $params[] = trim(str_replace($bad_chars, "",$_POST['city'])); 
    $params[] = trim(str_replace($bad_chars, "",$_POST['states'])); // 6
    $params[] = trim(str_replace($bad_chars, "",$_POST['zipcode']));
    
    # combine parts of phone numbers
    $phone = $_POST['area_num'].$_POST['pre_num'].$_POST['num'];
    $params[] = trim(str_replace($bad_chars, "",$phone));	//8
    
    $params[] = trim(str_replace($bad_chars, "",$_POST['email']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['gender'])); //10
    
    # Date of Birth
    $params[] = trim(str_replace($bad_chars, "",$_POST['month']));
    $params[] = trim(str_replace($bad_chars, "",$_POST['day'])); // 12
    $params[] = trim(str_replace($bad_chars, "",$_POST['year']));

    $params[] = trim(str_replace($bad_chars, "",$_POST['med'])); // 14
    $params[] = trim(str_replace($bad_chars, "",$_POST['exp'])); 
    $params[] = trim(str_replace($bad_chars, "",$_POST['category']));// 16
    
    //store the filename of the image uploaded
    $params[] = $GLOBALS['fname']; // 17
    
    // process date of birth
    $date_of_birth = "";
    if(strlen($params[11]) == 1)
    	$date_of_birth .= "0"."$params[11]";
    else
    	$date_of_birth .= "$params[11]";
    if(strlen($params[12]) == 1)
    	$date_of_birth .= "0"."$params[12]";
    else
    	$date_of_birth .= "$params[12]";
    $params[] = $date_of_birth.$params[13]; // 18

    return $params;
}

function validate_data($params) {
    $msg = "";
    if(strlen($params[17]) == 0)
    	$msg .= "Please upload your picture<br />";
    
    if(strlen($params[0]) == 0)
        $msg .= "Please enter your first name<br />";  
    #middle name is not required
    #if(strlen($params[1]) == 0)
     #   $msg .= "Please enter the middle name<br />"; 
    if(strlen($params[2]) == 0)
        $msg .= "Please enter the last name<br />"; 
    if(strlen($params[3]) == 0)
        $msg .= "Please enter the address<br />";                        
    if(strlen($params[5]) == 0)
        $msg .= "Please enter the city<br />"; 
    if($params[6] == "default")
        $msg .= "Please select state<br />";
     
    if(strlen($params[7]) == 0)
    	$msg .= "Please enter your 5-digit zipcode<br />";
    elseif(!is_numeric($params[7]))
    	$msg .= "Zipcode must only contain numbers<br />";

    # Validating phone number field
	$area_code = $_POST['area_num'];
	$pre_fix = $_POST['pre_num'];
	$last_num = $_POST['num'];	
    if(strlen($area_code) == 0)
	$msg .= "Please enter your area code number<br />";
    elseif(strlen($area_code) != 3 || !is_numeric($area_code))
	$msg .= "Phone area code must be 3 digit numbers<br />";
    if(strlen($pre_fix) == 0)
	$msg .= "Please enter your prefix phone number<br />";
    elseif(strlen($pre_fix) != 3 || !is_numeric($pre_fix))
	$msg .= "Phone prefix must be 3 digit numbers<br />";
    if(strlen($last_num) == 0)
	$msg .= "Please enter your last 4-digit phone number<br />";
    elseif(strlen($last_num) != 4 || !is_numeric($last_num))
	$msg .= "The last 4-digit must only contain numbers<br />";

    if(strlen($params[9]) == 0)
    	$msg .= "Please enter your primary email address<br />";
    elseif(!filter_var($params[9], FILTER_VALIDATE_EMAIL))
	$msg .= "Invalid email address<br />"; 
    if($params[10] == "")
    	$msg .= "Please select your gender<br />";
    
    if(strlen($params[11]) == 0)
    	$msg .= "Please enter your birth month<br />";
    if(strlen($params[12]) == 0)
    	$msg .= "Please enter your birth day<br />";
    if(strlen($params[13]) == 0)
    	$msg .= "Please enter your birth year<br />";
    elseif($params[13] < "1900")
    	$msg .= "Invalid birth year. You might be too old to run<br />";
    elseif($params[13] > "2004")
    	$msg .= "Invalid birth year. Too young to participate<br />";

    if(strlen($params[11]) != 0 && strlen($params[12]) != 0 && strlen($params[13]) != 0) {
	$date_val = checkdate($params[11],$params[12],$params[13]);
	if($date_val == false)
	    $msg .= "Invalid date<br />";	
    }
	
    if($params[15] == "")
    	$msg .= "Please select your experience level<br />";
    if($params[16] == "")
    	$msg .= "Please select your category<br />";
    
            
    if($msg) {
        write_form_error_page($msg);
        exit;
        }
}
  
function write_form_error_page($msg) {
    write_header();
    echo "<h2>Opps, an error has occurred<br />",
    $msg,"</h2>";
    write_form();
    write_footer();
}  
    
function write_form() {
    print <<<ENDBLOCK
    <h2>Sign up for SDSU Aztec Marathon</h2>
       <div id="signsheet">
 <div id="info_area">
    <form name="runner_info"
	  enctype="multipart/form-data"
	  method="post"
	  action="process_request.php" >

	<p id="req">&#42; required field</p>

	Runner's Photo: &#42;
	<input type="file" name="pic" accept="image/*" />
	<br /><br />
	<!-- Participant's name Info -->
	First Name: &#42; <input type="text" name="fname" value="$_POST[fname]" size="25" />
	<br /><br />
	Middle Name: <input type="text" name="mname" value="$_POST[mname]" size="25" />
	<br /><br />
	Last Name: &#42; <input type="text" name="lname" value="$_POST[lname]" size="25" />
	<br /><br />

	<!-- Address -->
	Address Line 1: &#42;
	<input type="text" name="address1" value="$_POST[address1]" 
	   placeholder="Street address, P.O. box" size="30" /><br /><br />
	Address Line 2:
	<input type="text" name="address2" value="$_POST[address2]" 
	   placeholder="Apt no., unit, etc" size="30" /><br /><br />
	City: &#42;
	<input type="text" name="city" value="$_POST[city]" /><br /><br />


	State: &#42; <select id="dropdown" name="states">
		<option value="default">--</option>
		<option value="AL">AL</option>
		<option value="AK">AK</option>
		<option value="AZ">AZ</option>
		<option value="AR">AR</option>
		<option value="CA" selected>CA</option>
		<option value="CO">CO</option>
		<option value="CT">CT</option>
		<option value="DE">DE</option>
		<option value="FL">FL</option>
		<option value="GA">GA</option>
		<option value="HI">HI</option>
		<option value="ID">ID</option>
		<option value="IL">IL</option>
		<option value="IN">IN</option>
		<option value="IA">IA</option>
		<option value="KS">KS</option>
		<option value="KY">KY</option>
		<option value="LA">LA</option>
		<option value="ME">ME</option>
		<option value="MD">MD</option>
		<option value="MA">MA</option>
		<option value="MI">MI</option>
		<option value="MN">MN</option>
		<option value="MS">MS</option>
		<option value="MO">MO</option>
		<option value="MT">MT</option>
		<option value="NE">NE</option>
		<option value="NV">NV</option>
		<option value="NH">NH</option>
		<option value="NJ">NJ</option>
		<option value="NM">NM</option>
		<option value="NY">NY</option>
		<option value="NC">NC</option>
		<option value="ND">ND</option>
		<option value="OH">OH</option>
		<option value="OK">OK</option>
		<option value="OR">OR</option>
		<option value="PA">PA</option>
		<option value="RI">RI</option>
		<option value="SC">SC</option>
		<option value="SD">SD</option>
		<option value="TN">TN</option>
		<option value="TX">TX</option>
		<option value="UT">UT</option>
		<option value="VT">VT</option>
		<option value="VA">VA</option>
		<option value="WA">WA</option>
		<option value="WV">WV</option>
		<option value="WI">WI</option>
		<option value="WY">WY</option>
	       </select>
	<br><br>	
	Zipcode: &#42;
	<input type="text" name="zipcode" value="$_POST[zipcode]" size="10" maxlength="5" />
	<br /><br />
	
	<!-- Primary phone -->
	Primary phone number: &#42;
	(<input type="text" name="area_num" value="$_POST[area_num]" size="3" maxlength="3" />) 
	<input type="text" name="pre_num" value="$_POST[pre_num]" size="3" maxlength="3" /> - 
	<input type="text" name="num" value="$_POST[num]" size="5" maxlength="4" />
	<br /><br />

	<!-- Email -->
	Primary Email Address: &#42; 
	<input type="text" name="email" value="$_POST[email]" placeholder="ex. you@example.com" />
	<br /><br />

	<!-- Gender -->
	Gender: &#42; 
	<input type="radio" name="gender" value="male" checked /> Male
	<input type="radio" name="gender" value="female"/> Female
	<input type="radio" name="gender" value="other" /> Other
	<br /><br />

	<!-- Date of Birth -->
	Date of Birth: &#42;
	<div id="dob">
	Month: 
	<input type="text" name="month" value="$_POST[month]" id="mm" placeholder="MM" maxlength="4" size="2" />
	Day: 
	<input type="text" name="day" value="$_POST[day]" id="dd" placeholder="DD" maxlength="4" size="2" />
	Year: 
	<input type="text" name="year" value="$_POST[year]" id="yy" placeholder="YYYY" maxlength="8" size="4" />
	</div>
	<br /><br />
	

	<!-- Medical Condition -->
	Medical Condition (specify):  <br />
	<textarea name="med" rows="100px" cols="400px"> </textarea>
	<br /><br />

	<!-- Experience Level -->
	Experience Level: &#42;<br />
	<input type="radio" name="exp" value="Expert"> Expert
	<input type="radio" name="exp" value="Experienced"> Experienced
	<input type="radio" name="exp" value="Novice" checked> Novice
	<br /><br />

	<!-- Category -->
	Category: &#42;<br />
	<input type="radio" name="category" value="Teen" checked> Teen
	<input type="radio" name="category" value="Adult"> Adult
	<input type="radio" name="category" value="Senior"> Senior
	<br /><br />
 </div>
	<div id="submit">
	<input type="submit" value="Submit" />
	<input type="reset" value="Reset" />
	</div>
	
    </form>
	
ENDBLOCK;
}                        
    
function store_data_in_db($params) {
    # get a database connection
    $db = get_db_handle();  ## method in helpers.php
    ##############################################################
    $sql = "SELECT * FROM runner WHERE ".
    "email='$params[9]' AND ".
    "phone = '$params[8]';";
##echo "The SQL statement is ",$sql;    
    $dup_copy = mysqli_query($db, $sql);
    if(mysqli_num_rows($dup_copy) > 0) {
        write_form_error_page('This record appears to be a duplicate');
        exit;
        }
##OK, insert new form if no duplicate							//10	11	12    13	14   15        16       17
    $sql = "INSERT INTO runner(fname,mname,lname,address1,address2,city,states,zip,phone,email,gender,b_month,b_day,b_year,medical,experience,category,pic) ".
   
"VALUES('$params[0]','$params[1]','$params[2]','$params[3]','$params[4]','$params[5]','$params[6]','$params[7]','$params[8]','$params[9]','$params[10]','$params[11]','$params[12]','$params[13]','$params[14]','$params[15]','$params[16]','$params[17]');";
##echo "The SQL statement is ",$sql;    
    mysqli_query($db,$sql);
    $how_many = mysqli_affected_rows($db);
    echo("There were $how_many rows affected");
    close_connector($db);
}
        
?>   
