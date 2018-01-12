/*changes here*/
var price_data;

/* end of change */

$(document).ready( function() {
    var cart = new shopping_cart("jadrn012");
    
    /*alert("JS is Working written in checkout_dot_js");*/
    
    price_data = new Array();
    $.get('/perl/jadrn012/get_products.cgi', storeData);

	//cart.setQuantity($('#sku').val(), $('#qty').val());
	//updateDisplay();

    updateDisplay();
	
    $('#paymentinfo').hide();
	
    $('#confirmbttn').on('click', function() {
    	updateDisplay();
	$('#paymentinfo').show();
	$('input[name="bill_fname"]').focus();
    	});
        
    $('#deleteButton').on('click', function() {
        cart.delete($('#sku').val());
        updateDisplay();
        });   
        
    $('#quantityButton').on('click', function() {
        cart.setQuantity($('#sku').val(), $('#qty').val());
        updateDisplay();
        });                
        
    $('#seeCartBttn').on('click', function() {
    	updateDisplay();
	$('#paymentinfo').show();
	$('input[name="bill_fname"]').focus();	
    	});	
        
    function updateDisplay() {
        var cartArray = cart.getCartArray();
	
	//if(cartArray.length < 1) alert("empty cart");
	
	//changed 10:35
        var showCart = "<table cellspacing='15'>";
	
	//changed 10:35
	var totalCost = 0.00;
	var shipFee = 2.00;
	var caTax = 0.08;
	var salesTax = 0;
	// used to display amounts using .fixed() function
	var showSubTotl = 0;
	var showSalesTx = 0;
	var showShipFee = 0;
	
        showCart +="<tr><th>SKU</th><th>Quantity</th><th>Price</th><th>Items</th></tr>";
        for(i=0; i < cartArray.length; i++) {
            showCart += "<tr>";
            showCart += "<td>"+cartArray[i][0]+"</td>";
            showCart += "<td>\t"+cartArray[i][1]+"</td>";
	    /*line 10*/
	    var price = 0;
	    var itemName = "";
	    for(x=0; x < price_data.length; x++) {
	    	if(price_data[x][0] == cartArray[i][0]) {
			itemName = price_data[x][2];
			price = price_data[x][6];
			price = price * cartArray[i][1];
		}
	    }
	    
	    showCart += "<td>"+price+"</td>";
	    showCart += "<td>"+itemName+"</td>";
            showCart += "</tr>";
	    totalCost += price;
            }
        showCart += "</table>";
	showSubTotl = totalCost;
	showCart += "<h1>Subtotal: $"+showSubTotl.toFixed(2)+"</h1>";
	
	//calculate sales tax not including shipping fee
	salesTax = (caTax * totalCost);
	showSalesTx = salesTax;
	showCart += "<h1>Sales Tax: $"+showSalesTx.toFixed(2)+"</h1>";
	showShipFee = shipFee;
	showCart += "<h1>Shipping: $"+showShipFee.toFixed(2)+"</h1>";
	//one line below is changed 10:35
	var orderTotal = salesTax+totalCost;
	/*showCart += "<h1>"+orderTotal+"</h1>";*/
	showCart += "<h1>Order Total: $"+(orderTotal+shipFee).toFixed(2)+"</h1>"; 
        $('#cart').html(showCart); 
        $('#count').text(cart.size());     
        } 
                 
});

function storeData(response) {
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        price_data[i] = innerArray;
        }
    }

// from http://www.webmasterworld.com/forum91/3262.htm            
function explodeArray(item,delimiter) {
tempArray=new Array(1);
var Count=0;
var tempString=new String(item);

while (tempString.indexOf(delimiter)>0) {
tempArray[Count]=tempString.substr(0,tempString.indexOf(delimiter));
tempString=tempString.substr(tempString.indexOf(delimiter)+1,tempString.length-tempString.indexOf(delimiter)+1);
Count=Count+1
}

tempArray[Count]=tempString;
return tempArray;
} 
