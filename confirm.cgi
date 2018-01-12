#!/usr/bin/perl  

use CGI;
use CGI::Cookie;
use DBI;
use Time::Piece;

$q = new CGI;

my $date = localtime->strftime('%m/%d/%Y');


#send a blank cookie.  You must insert this into the header before
#printing anything.  Also, using the CGI module makes printing
#content-type: text/html redundant.

my $cookie = $q->cookie(-name=>'jadrn012',-value=>'',-path=>'/');
print $q->header(-cookie=>$cookie);
print <<END_CONTENT;
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<head>
	<title>Order Confirmation</title>
        	<meta http-equiv="content-type"
                		content="text/html;charset=utf-8" />
            	<meta http-equiv="Content-Style-Type" content="text/css" />
	<link rel="stylesheet" type="text/css" href="/~jadrn012/proj4/design.css" />
</head>

<body>
    <div>
            <h1>Bertha's Deluxe Chocolates</h1>
END_CONTENT
my %cookies = $ENV{COOKIE};
#for( keys %cookies) {
#print "The value of the cookie is: $cookies{$_}\n";
#}

print "<div id=\"confirmTable\"><table>\n";
my ($key, $value);
     
%cookies = CGI::Cookie->fetch;
for(keys %cookies) {
#    print "$cookies{$_}\n";
    }

my $host = "opatija.sdsu.edu";
my $port = "3306";
my $database = "jadrn012";
my $username = "jadrn012";
my $password = "telephone";
my $database_source = "dbi:mysql:$database:$host:$port";
    
my $dbh1 = DBI->connect($database_source, $username, $password) 
or die 'Cannot connect to db';

print "Here's a list of what you ordered:<br />";

#print "<h1>Shopping cart cookie</h1>";
my $v = $q->cookie('jadrn012');
#print "The raw cookie value is $v<br />";   
@rows = split('\|\|',$v);
foreach $row (@rows) {
    ($sku, $qty) = split('\|',$row);
    print "$sku = $qty<br />";

my $sth = $dbh1->prepare("INSERT INTO sales(date, sku, quantity) VALUES('$date','$sku','$qty');");
$sth->execute();

$sth->finish();
    } 


$dbh1->disconnect();


     
#print "<h1>Parameters passed to script:</h1>\n";
my ($key, $value);

my @names = ("First Name", "Last Name", "Billing Address 1", "Billing Address 2", "City", "State", "Zip", "Phone", "First Name", "Last Name", "Shipping Address 1", "Shipping Address Line 2", "City", "State", "Zipcode", "Phone Number", "Payment Type", "Card Number", "Expiration Month", "Expiration Year", "Shipping Information");

my $counter = 0;

print "<h2>Thank you for your purchase</h2>\n";
print "<h4>Your order will be shipped to this following information</h4>\n";
print "<h4>Please close your browser when done</h4>\n";

               
foreach $key ($q->param) {
    if($counter < 8) {
    	$counter++;
    }
    else {
    print "<tr>\n";
    print "<td>$names[$counter++]</td>\n";
    foreach $value ($q->param($key)) {
        print "<td>$value</td>\n";
        }
    print "</tr>\n";
    }
}
print "</table></div>\n";
print "</div>\n";
print "</body>\n";
print "</html>\n";
#foreach $key ($q->param) {
 #   print "<tr>\n";
  #  print "<td>$key</td>\n";
   # foreach $value ($q->param($key)) {
	#modification here
	
	#if($key == 'card_num') {
	#	print "<td>XXXXXXXXX $value</td>\n";
	#} else
   #     	print "<td>$value</td>\n";
    #    }
    #print "</tr>\n";
#}
print "</table>\n";
print "</div>\n";
print "</body>\n";
print "</html>\n";

