/*
	Coded by Peter De Jesus
	Class account jadrn012
	
	some of the code was adapted from jadrn000
 */

var proj4_data;

$(document).ready(function() {
    proj4_data = new Array();
    $.get('/perl/jadrn012/get_products.cgi', storeData);

});

function storeData(response) {
    var tmpArray = explodeArray(response,';');
    for(var i=0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i],'|');
        proj4_data[i] = innerArray;
        }
	
    var p_select = (Math.ceil(Math.random() * 100)) % proj4_data.length;
    tmp = "<h4>Here is just a few of our products</h4>";
    for(var i=0; i < 4; i++) {
        p_select = (p_select + 8) % proj4_data.length;
        if(proj4_data[p_select][0] === undefined)
            p_select = (p_select + 8) % proj4_data.length;

	tmp += "<div class=\"mainChoc\">";
        tmp += "<img src=\"/~jadrn000/PROJ4_IMAGES/"+
        proj4_data[p_select][0]+".jpg\" alt=\""+proj4_data[p_select][2]+"\""+
        " width=\"200px\"  />";
        /*for(var j=0; j < proj4_data[p_select].length; j++) */
            /*tmp += "<h2>" + proj4_data[p_select][2] + "</h2><br />";
	    tmp += "<h5>" + proj4_data[p_select][3] + "</h5><br /></div>";*/
	    
    }
    var handle = document.getElementById('mainPageShow');
    handle.innerHTML = tmp;
	
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

