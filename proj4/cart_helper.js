/*	
 *	Fall 2017, Project 4
 *
 *	Code was adapted from jadrn000 account
 */

$(document).ready( function() {
    var cart = new shopping_cart("jadrn012");
 
   
  /*  $('#addButton').on('click', function() {
        cart.add($('#sku').val(), $('#qty').val());
        updateDisplay();
        });*/
        
    $('#deleteButton').on('click', function() {
        cart.delete($('#sku').val());
        updateDisplay();
        });   
        
    $('#quantityButton').on('click', function() {
        cart.setQuantity($('#sku').val(), $('#qty').val());
        updateDisplay();
        });                
        
        
    function updateDisplay() {
        var cartArray = cart.getCartArray();
        var showCart = "<table>";
        showCart += "<tr><th>SKU</th><th>Quantity</th></tr>";
        for(i=0; i < cartArray.length; i++) {
            showCart += "<tr>";
            showCart += "<td>"+cartArray[i][0]+"</td>";
            showCart += "<td>"+cartArray[i][1]+"</td>"; 
            showCart += "</tr>";
            }
        showCart += "</table>"; 
        $('#cart').html(showCart); 
        $('#count').text(cart.size());     
        } 
        
    $( "#dialog-modal" ).dialog({
            height: 350,
            width: 500,
            modal: true,
            autoOpen: false
    });
    /*
    $('#order_button').on('click', function($e) {       
            $("#dialog-modal").dialog('open');
            });  */               
});
