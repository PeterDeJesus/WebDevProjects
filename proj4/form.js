var msg = ['Please enter your first name',
	   'Please enter your last name',
	   'Please enter your street address',
	   'Please enter your city',
	   'Please select your state',
	   'Please enter your zipcode',
	   'Please enter your complete phone number',
	   'Please enter your First Name(Shipping)',
	   'Please enter your Last Name(Shipping)',
	   'Please enter your Shipping Address',
	   'Please enter your city',
	   'Please enter your state',
	   'Please enter your zipcode',
	   'Please enter your phone number',
	   'Please select the card type',
	   'Please enter your credit card number',
	   'Please select the card expiration month',
	   'Please select the card expiration year'];

/*	Code written by Peter De Jesus
	class account: jadrn012	*/

var error_msg = ['Invalid State',
		 'Invalid Zipcode',
		 'Invalid phone number',
		 'Invalid Credit Card Number',
		 'Enter complete phone number (areacode, prefix, and last 4-digit)',
		 'Invalid Expiration Year'];

// adapted from jadrn000 account in jadran.sdsu.edu
function validState(state) {
	var states = new Array("AK","AL","AR","AZ","CA","CO","CT","DC",
        "DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA",
        "MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ",
        "NM","NV","NY","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX",
        "UT","VA","VT","WA","WI","WV","WY");
	for (var i = 0; i < states.length; i++)
	     if(states[i] == $.trim(state))
		return true;
	return false;
};

function isEmpty(inputValue) {
	return $.trim(inputValue).length == 0;
}

$(document).ready(function() {

	var h = new Array();
	h[0] = $('input[name="bill_fname"]');
	h[1] = $('input[name="bill_lname"]');
        h[2] = $('input[name="bill_address1"]');
        h[3] = $('input[name="bill_city"]');
        h[4] = $('input[name="bill_state"]');
        h[5] = $('input[name="bill_zip"]');
        h[6] = $('input[name="bill_phone"]');
	
	h[7] = $('input[name="ship_fname"]');
	h[8] = $('input[name="ship_lname"]');
        h[9] = $('input[name="ship_address1"]');
        h[10] = $('input[name="ship_city"]');
        h[11] = $('input[name="ship_state"]');
        h[12] = $('input[name="ship_zip"]');
        h[13] = $('input[name="ship_phone"]');
	
	h[14] = $('input[name="cardtype"]');
	h[15] = $('input[name="card_num"]');
	h[16] = $('select[name="months"]');
	h[17] = $('input[name="expyear"]');
	
	h[18] = $('input[name="shipbill"]');

	/*h[7] = $('input[name="card_num"]');*/

	h[0].focus();
	

	$(':submit').on('click',function() {
		return validateForm();
		//return validateForm();
		//alert("Form Pass");
	});

	h[4].on('keyup', function() {
		h[4].val(h[4].val().toUpperCase());
	});
	
	h[11].on('keyup', function() {
		h[11].val(h[11].val().toUpperCase());
	});
	
	$("#sameShipping").on('click', function() {
	   if($("#sameShipping").is(':checked')) {
		sameShip();
		h[18].val("Same Shipping Information and Billing Information");
		/*$("#shippingForm").hide();*/
		}
	   else {
		//alert("not checked");
		/*$("#shippingForm").show();*/
		resetShip();
		/*h[18].val("Different Shipping Information");*/
		}
	   });
		
	function sameShip() {
		//alert("checked");
		for(var i=0; i < 7; i++) {
			h[i+7].val(h[i].val());
		}
	}//sameShip function
	
	function resetShip() {
		for(var i=7; i < 14; i++) {
			h[i].val('');
		}
	}

	var errorStatus = $('#status');

	function validateForm() {
		// deals with blank text
	// first name
	   if(isEmpty(h[0].val())) {
		errorStatus.text(msg[0]);
		h[0].focus();
		return false;
	   	}
	// last name
           if(isEmpty(h[1].val())) {
                errorStatus.text(msg[1]);
                h[1].focus();
                return false;
           	}
	// address 1
           if(isEmpty(h[2].val())) {
                errorStatus.text(msg[2]);
                h[2].focus();
                return false;
           	}
	// city
           if(isEmpty(h[3].val())) {
                errorStatus.text(msg[3]);
                h[3].focus();
                return false;
           	}
	// state
           if(isEmpty(h[4].val())) {
                errorStatus.text(msg[4]);
                h[4].focus();
                return false;
           	}
	   if(!validState(h[4].val())) {
		errorStatus.text(error_msg[0]);
		h[4].focus();
		return false;
		}
	// zip
           if(isEmpty(h[5].val())) {
                errorStatus.text(msg[5]);
                h[5].focus();
                return false;
           	}
	var zipcode = $.trim(h[5].val());
	   if(zipcode.length != 5) {
		errorStatus.text(error_msg[1]);
		h[5].focus();
		return false;
		}
	   if(!$.isNumeric(zipcode)) {
		errorStatus.text(error_msg[1]);
		h[5].focus();
		return false;
		}
	// phone
           if(isEmpty(h[6].val())) {
                errorStatus.text(msg[6]);
                h[6].focus();
                return false;
           	}
	var phone = $.trim(h[6].val());
	   if(phone.length != 10) {
	   	errorStatus.text(error_msg[4]);
		h[6].focus();
		return false;
	   	}
	   if(!$.isNumeric(phone)) {
		errorStatus.text(error_msg[2]);
		h[6].focus();
		return false;
		}
	// shipping info
	//first name
           if(isEmpty(h[7].val())) {
                errorStatus.text(msg[7]);
                h[7].focus();
                return false;
           	}
	//last name
           if(isEmpty(h[8].val())) {
                errorStatus.text(msg[8]);
                h[8].focus();
                return false;
           	}
	//address 1
           if(isEmpty(h[9].val())) {
                errorStatus.text(msg[9]);
                h[9].focus();
                return false;
           	}
	//shipping city
           if(isEmpty(h[10].val())) {
                errorStatus.text(msg[10]);
                h[10].focus();
                return false;
           	}
	//shipping state
           if(isEmpty(h[11].val())) {
                errorStatus.text(msg[11]);
                h[11].focus();
                return false;
           	}
	   if(!validState(h[11].val())) {
		errorStatus.text(error_msg[0]);
		h[11].focus();
		return false;
		}
	//shipping zipcode
           if(isEmpty(h[12].val())) {
                errorStatus.text(msg[12]);
                h[12].focus();
                return false;
           	}
	var zipcode2 = $.trim(h[12].val());
	   if(zipcode2.length != 5) {
		errorStatus.text(error_msg[1]);
		h[12].focus();
		return false;
		}
	   if(!$.isNumeric(zipcode2)) {
		errorStatus.text(error_msg[1]);
		h[12].focus();
		return false;
		}
	//shipping phone number
           if(isEmpty(h[13].val())) {
                errorStatus.text(msg[13]);
                h[13].focus();
                return false;
           	}
	var ship_phone = $.trim(h[13].val());
	   if(ship_phone.length != 10) {
	   	errorStatus.text(error_msg[4]);
		h[13].focus();
		return false;
	   }
	   if(!$.isNumeric(ship_phone)) {
	   	errorStatus.text(error_msg[2]);
		h[13].focus();
		return false;
	   }
	   
	// validate card type
	//h[14]
	var choice = h[14];
	var selected;
	$.each(choice, function(k,v) {
		if(this.checked) selected = v.value;
	});
	if(selected) {}
	else {
		errorStatus.text(msg[14]);
		choice.focus();
		return false;
	}

	// credit card number
	
	   if(isEmpty(h[15].val())) {
		errorStatus.text(msg[15]);
		h[15].focus();
		return false;
		}
	var cardNum = $.trim(h[15].val());
	   if(cardNum.length != 16) {
	   	errorStatus.text(error_msg[3]);
		h[15].focus();
		return false;
	   }
	   if(!$.isNumeric(cardNum)) {
		errorStatus.text(error_msg[3]);
		h[15].focus();
		return false;
		}
	   /*else {
		var tmpNum = cardNum.replace(cardNum.substring(0,12),"XXXX XXXX XXXX ");
		$('input[name="card_num"]').val(tmpNum);
		}*/
		
		
	// card expiration date
	var m_selection = $('#dropdown option:selected').val();
	if(m_selection == "default") {
		errorStatus.text(msg[16]);
		h[16].focus();
		return false;
		}
	else {}
	
	// card year
           if(isEmpty(h[17].val())) {
                errorStatus.text(msg[17]);
                h[17].focus();
                return false;
           	}
	var crd_year = $.trim(h[17].val());
	   if(!$.isNumeric(crd_year)) {
	   	errorStatus.text(error_msg[5]);
		h[17].focus();
		return false;
	   }
	   if(crd_year < 2018) {
	   	errorStatus.text(error_msg[5]);
		h[17].focus();
		return false;
	   }
	   
	//when everything in the form works
	var tmpNum = cardNum.replace(cardNum.substring(0,12),"XXXX XXXX XXXX ");
	$('input[name="card_num"]').val(tmpNum);

	}//validate function

	

});
