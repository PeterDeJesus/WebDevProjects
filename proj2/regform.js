var msg = ['Please upload your picture',
	   'Please enter your first name',
	   'Please enter your last name',
	   'Please enter your address',
	   'Please enter your city',
	   'Please enter your zipcode',
	   'Please enter your phone number area code',
	   'Please enter your phone number prefix',
	   'Please enter your complete phone number',
	   'Please enter your birth month',
	   'Please enter your birth day',
	   'Please enter your birth year'];

var msg_name = ['Invalid character in your first name',
		'Invalid character in your middle name',
		'Invalid character in your last name',
		'Invalid character in address 1',
		'Invalid character in address 2',
		'Invalid character in City',
		'Please select a state',
		'Invalid zipcode',
		'Invalid area code phone number',
		'Invalid prefix phone number',
		'Invalid last 4-digit line number'];

/*	Code written by Peter De Jesus
	class account: jadrn012	*/

$(document).ready(function() {

	//used for image size
	var size = 0;

	// alphanumeric
	var name_tokens = "[a-zA-Z- ~!@#$%^&*()_]";

	var h = new Array(12);
	h[0] = $('input[name="pic"]');
	h[1] = $('input[name="fname"]');
	h[2] = $('input[name="lname"]');
	h[3] = $('input[name="address1"]');
	h[4] = $('input[name="city"]');
	h[5] = $('input[name="zipcode"]');
	h[6] = $('input[name="area_num"]');
	h[7] = $('input[name="pre_num"]');
	h[8] = $('input[name="num"]');
	h[9] = $('input[name="month"]');
	h[10] = $('input[name="day"]');
	h[11] = $('input[name="year"]');
	
// do same thing for other variables 

//focus to the first item, or highlight the first item
	h[0].focus();

	$('input[name="pic"]').on('change',function(e) {
		size = this.files[0].size;
	});

	$(':submit').on('click',function() {
		return validateForm();
		});

// used when you click reset, it should re-focus to the first item
	$(':reset').on('click',function() {
		h[0].focus();
		});

	$('input').on('blur',function(e) {
		if($.trim(e.target.value)) $('status').text('');
		});

	function validateForm() {
		// deals with blank text
		for (var i=0; i < 12; i++)
			if(!$.trim(h[i].val())) {
				$('#status').text(msg[i]);
				h[i].focus();
				return false;
			}
		// image validation
		if(size/1000 > 1000) {
			$('#status').text("Image is too big, 1MB max");
			h[0].focus();
			return false;
		}
	

	// validate state
		var d_selection = $('#dropdown option:selected').val();
		if(d_selection == "default") {
			$('#status').text(msg_name[6]);
			$('select[name="states"]').focus();
			return false;
			}
		else { }


	//validate zipcode

		var zippy = $.trim($('input[name="zipcode"]').val());
		if(zippy.length != 5) {
			$('#status').text(msg_name[7]);
			$('input[name="zipcode"]').focus();
			return false;
			}
		for(var i = 0; i < zippy.length; i++) {
			if(zippy.charAt(i).match("[0-9]")) {
				continue;
			} else { 
				$('#status').text(msg_name[7]);
				$('input[name="zipcode"]').focus();
				return false;
			}
		}

	//validate phone number
		var ph_num = new Array(3);
		var ph_lim = [3, 3, 4];

		ph_num[0] = $.trim($('input[name="area_num"]').val());
		ph_num[1] = $.trim($('input[name="pre_num"]').val());
		ph_num[2] = $.trim($('input[name="num"]').val());
		for(var i = 0; i < 3; i++) {
			if(ph_num[i].length != ph_lim[i]) {
				$('#status').text(msg_name[i+8]);
				h[i+6].focus();
				return false;
			}
			for(var j = 0; j < ph_num.length; j++) {
				if(ph_num[i].charAt(j).match("[0-9]")) {
					continue;
				} else {
					$('#status').text(msg_name[i+8]);
					h[i+6].focus();
					return false;
				}
			}
		}

	// validate email address
		var e_mail = $.trim($('input[name="email"]').val());
		var at_sign_pos = 0;
		var dot_sign_pos = 0;		//needs to be greater,after @ sign

		var f_quote = 0;
		var l_quote = 0;
		var quote_count = 0;
		var at_count = 0;

		var email_token = "[A-Za-z0-9!#%&'*+\"-/=?^_`{|}~]";
		var email_res = "(),:;<>[\] "

		for(var i = 0; i < e_mail.length; i++) {
			if(e_mail.charAt(i)=='@') {
				at_sign_pos = i;
				at_count++;
			}
			if(e_mail.charAt(i)=='.') dot_sign_pos = i;

			if(e_mail.charAt(i)=='"') {
				quote_count++;
				if(f_quote==l_quote) f_quote = i;
				else l_quote = i;
			}

			// look for invalid tokens
			if(e_mail[i].match(email_token) || at_sign_pos > 0) {
				continue;
			} else {
				$('#status').text("Invalid Email Address");
				$('input[name="email"]').focus();
				return false;
			}
		}
		if(e_mail.charAt(0)=='"')
			if(f_quote!=l_quote) {
				l_quote = f_quote;
				f_quote = 0;
			}
		
		
		// if "dot(.)" comes before "at@"
		if(dot_sign_pos < at_sign_pos) {
			$('#status').text("Invalid Email Address");
			return false;
		}
		// check if "dot(.)" is first or last token
		if(dot_sign_pos == (e_mail.length) - 1 || e_mail[0] == '.') {
			$('#status').text("Invalid Email Address");
			return false;
		}
		// check if character restriction is inside quotes
		if((quote_count % 2)!=0) {
			$('#status').text("Invalid Email Address");
			return false;
		}
		if(at_count > 1) {
			$('#status').text("Invalid Email Address");
			return false;
		}

	
	// validate gender
		var choice = $('input[name="gender"]');
		var selected;
		$.each(choice, function(k,v) {
			if(this.checked) selected = v.value;
		});
		if(selected) {}
		else {
			$('#status').text("Please select your gender");
			choice.focus();
			return false;
		}

	// validate date of birth
		var day = document.getElementById("dd").value;
		var month = document.getElementById("mm").value;
		var year = document.getElementById("yy").value;
		
		var checkDate = new Date(year, month-1, day);    
		var checkDay = checkDate.getDate();
		var checkMonth = checkDate.getMonth()+1;
		var checkYear = checkDate.getFullYear();
	
		if(day==checkDay && month==checkMonth && year==checkYear) {
			}
		else {
			$('#status').text("Invalid date");
			$('input[name="month"]').focus();
			return false;
		}	
		

	// validate experience level
		var exp_choice = $('input[name="exp"]');
		var exp_selected;
		$.each(exp_choice, function(k,v) {
			if(this.checked) exp_selected = v.value;
		});
		if(exp_selected) {}
		else {
			$('#status').text("Please select your experience level");
			exp_choice.focus();
			return false;
		}
	// validate category
		var cat_choice = $('input[name="category"]');
		var cat_selected;
		$.each(cat_choice, function(k,v) {
			if(this.checked) cat_selected = v.value;
		});
		if(cat_selected) {}
		else {
			$('#status').text("Please select your category");
			cat_choice.focus();
			return false;
		}


		return true;
	};


});