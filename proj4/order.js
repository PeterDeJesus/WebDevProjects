/*  
	Coded By: Peter De Jesus
	Jadran Account: jadrn012
	CS545 Project 4, Fall 2017

	Some parts of this code has been adopted from 
	the jadrn000 account.
*/    


var proj4_data;

$(document).ready(function() {
    proj4_data = new Array();
    $.get('/perl/jadrn012/get_products.cgi', storeData);

    var cart = new shopping_cart("jadrn012");
    
    $('#milk').on('click', function() {
        tmp = "<h2>Milk Chocolates</h2><hr>";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Milk chocolate") {
	    tmp += "<div class=\"choco\">";
            tmp += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";
                //for(var j=0; j < proj4_data[i].length; j++)
		//This is for the SKU of product
		tmp += "<h5>SKU:  " + proj4_data[i][0] + "</h5><br />";
		// Displays product category
                    tmp += "Category:  " + proj4_data[i][1] + "<br />";
		tmp += "Product Name:  " + proj4_data[i][2] + "<br />";
		tmp += "<h4>Price:  $" + proj4_data[i][6] + "</h4><br />";
                tmp += "<input type='button' value='Add To Cart'"+
                "class='buy' id='" + proj4_data[i][0]+"' />";
            tmp += "<span>Added to Cart</span><br /></div>";
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmp;
        })

	// adapted from jadrn000 with a couple of changes
    $('#dark').on('click', function() {
        tmp = "<h2>Dark Chocolates</h2><hr>";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Dark chocolate") {
	    tmp += "<div class=\"choco\">";
            tmp += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";            
                //for(var j=0; j < proj4_data[i].length; j++)
                    tmp += "<h5>SKU:  " + proj4_data[i][0] + "</h5><br />";
		tmp += "Category:  " + proj4_data[i][1] + "<br />";
		tmp += "Product Name:  " + proj4_data[i][2] + "<br />";
		tmp += "<h4>Price:  $" + proj4_data[i][6] + "</h4><br />";
                tmp += "<input type='button' value='Add To Cart'"+
                "class='buy' id='" + proj4_data[i][0]+"' />";
            tmp += "<span>Added to Cart</span><br /></div>";                
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmp;
        })
        
    $('#nuts').on('click', function() {   
        tmp = "<h2>Nuts and Chews</h2><hr>";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Nuts and chews") { 
	    tmp += "<div class=\"choco\">"; 
            tmp += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";                     
                //for(var j=0; j < proj4_data[i].length; j++)
                    tmp += "<h5>SKU:  " + proj4_data[i][0] + "</h5><br />";
		tmp += "Category:  " + proj4_data[i][1] + "<br />";
		tmp += "Product Name:  " + proj4_data[i][2] + "<br />";
		tmp += "<h4>Price:  $" + proj4_data[i][6] + "</h4><br />";
                tmp += "<input type='button' value='Add To Cart'"+
                "class='buy' id='" + proj4_data[i][0]+"' />";
            tmp += "<span>Added to Cart</span><br /></div>";
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmp;
        }) 
        
    $('#brittle').on('click', function() {
        tmp = "<h2>Brittles and Toffies</h2><hr>";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Brittles and toffies") {
	    tmp += "<div class=\"choco\">";
            tmp += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";            
                //for(var j=0; j < proj4_data[i].length; j++)
                    tmp += "<h5>SKU:  " + proj4_data[i][0] + "</h5><br />";
		tmp += "Category:  " + proj4_data[i][1] + "<br />";
		tmp += "Product Name:  " + proj4_data[i][2] + "<br />";
		tmp += "<h4>Price:  $" + proj4_data[i][6] + "</h4><br />";
                tmp += "<input type='button' value='Add To Cart'"+
                "class='buy' id='" + proj4_data[i][0]+"' />";
            tmp += "<span>Added to Cart</span><br /></div>";
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmp;
        });

    $('#truffle').on('click', function() {
        tmp = "<h2>Truffles</h2><hr>";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Truffles") {
	    tmp += "<div class=\"choco\">";
            tmp += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";
                //for(var j=0; j < proj4_data[i].length; j++)
                //This is for the SKU of product
                tmp += "<h5>SKU:  " + proj4_data[i][0] + "</h5><br />";
                // Displays product category
                    tmp += "Category:  " + proj4_data[i][1] + "<br />";
                tmp += "Product Name:  " + proj4_data[i][2] + "<br />";
                tmp += "<h4>Price:  $" + proj4_data[i][6] + "</h4><br />";
                tmp += "<input type='button' value='Add To Cart'"+
                "class='buy' id='" + proj4_data[i][0]+"' />";
            tmp += "<span>Added to Cart</span><br /></div>";
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmp;
        })

    $('#gifts').on('click', function() {
        tmp = "<h2>Gifts</h2><hr>";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Gifts") {
	    tmp += "<div class=\"choco\">";
            tmp += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";
                //for(var j=0; j < proj4_data[i].length; j++)
                //This is for the SKU of product
                tmp += "<h5>SKU:  " + proj4_data[i][0] + "</h5><br />";
                // Displays product category
                    tmp += "Category:  " + proj4_data[i][1] + "<br />";
                tmp += "Product Name:  " + proj4_data[i][2] + "<br />";
                tmp += "<h4>Price:  $" + proj4_data[i][6] + "</h4><br />";
                tmp += "<input type='button' value='Add To Cart'"+
                "class='buy' id='" + proj4_data[i][0]+"' />";
            tmp += "<span>Added to Cart</span><br /></div>";
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmp;
        })

    $('#assortment').on('click', function() {
        tmp = "<h2>Holiday Assortments</h2><hr>";
        for(var i=0; i < proj4_data.length; i++) {
            if(proj4_data[i][1] == "Holiday assortments") {
	    tmp += "<div class=\"choco\">";
            tmp += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
                proj4_data[i][0]+".jpg\" alt=\""+proj4_data[i][2]+"\""+
                " width=\"200px\"  /><br />";
                //for(var j=0; j < proj4_data[i].length; j++)
                //This is for the SKU of product
                tmp += "<h5>SKU:  " + proj4_data[i][0] + "</h5><br />";
                // Displays product category
                    tmp += "Category:  " + proj4_data[i][1] + "<br />";
                tmp += "Product Name:  " + proj4_data[i][2] + "<br />";
                tmp += "<h4>Price:  $" + proj4_data[i][6] + "</h4><br />";
                tmp += "<input type='button' value='Add To Cart'"+
                "class='buy' id='" + proj4_data[i][0]+"' />";
            tmp += "<span>Added to Cart</span><br /></div>";
                }
            }
        var handle = document.getElementById('content');
        handle.innerHTML = tmp;
        })
        
$('#content').on('click',$('input[type="button"]'), function(e) {
    if($(e.target).val() != 'Add to Cart') return;
    alert("The SKU is " + $(e.target).attr("name"));
    });
        
    $(document).on('click', ".buy", function() {  
        var sku = this.id;
	var price = 0;
	for(var i=0; i < proj4_data.length; i++) {
		if(proj4_data[i][0] == sku) {
			price = proj4_data[i][6];
			//alert("found on database, Price: " + price);
		}
	}
        cart.add(sku,1);
        $(this).next().fadeIn(50).fadeOut(2000);
        });      
        
                    
    });    

    
function storeData(response) {
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj4_data[i] = innerArray;
        }
	
    var p_select = (Math.ceil(Math.random() * 100)) % proj4_data.length;
    tmp = "<h4>Here is just a few of our products, please select from our categories to see our fine products</h4>";
    for(var i=0; i < 8; i++) {
        p_select = (p_select + 7) % proj4_data.length;
        while(proj4_data[p_select][0] === undefined)
            p_select = (p_select + 7) % proj4_data.length;

	tmp += "<div class=\"mainOrder\">";
        tmp += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
        proj4_data[p_select][0]+".jpg\" alt=\""+proj4_data[p_select][2]+"\""+
        " width=\"200px\"  /><br />";
        /*for(var j=0; j < proj4_data[p_select].length; j++) */
            tmp += "<h2>" + proj4_data[p_select][2] + "</h2><br />";
	    tmp += "<h5>" + proj4_data[p_select][6] + "</h5><br /></div>";
	    
    }
    var handle = document.getElementById('content');
    handle.innerHTML = tmp;
	
    }

function showMilk() {
	
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
