#!/usr/bin/perl  

use CGI;
use CGI::Cookie;
use DBI;
use Time::Piece;

$q = new CGI;

my $date = localtime->strftime('%m/%d/%Y %r');

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
	<title>Cookie Reader</title>
        	<meta http-equiv="content-type"
                		content="text/html;charset=utf-8" />
            	<meta http-equiv="Content-Style-Type" content="text/css" />
</head>

<body>
    <div>
            <h1>Cookie Reader</h1>
END_CONTENT

print $date;

print "</div>\n";
print "</body>\n";
print "</html>\n";

