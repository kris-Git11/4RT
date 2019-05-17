<?php
use PEAR2\Net\RouterOS;
require_once 'PEAR2/Autoload.php';

?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>Your MAC address</title>
    </head>
    <body>
        <h1>
            <?php
try {
    //Adjust RouterOS IP, username and password accordingly.
    $client = new RouterOS\Client('192.168.88.1', 'admin', 'password');

    $printRequest = new RouterOS\Request('/ip arp print .proplist=mac-address');
    $printRequest->setQuery(
        RouterOS\Query::where('address', $_SERVER['REMOTE_ADDR'])
    );
    $mac = $client->sendSync($printRequest)->getProperty('mac-address');

    if (null !== $mac) {
        echo 'Your MAC address is: ', $mac;
    } else {
        echo 'Your IP (', $_SERVER['REMOTE_ADDR'],
        ") is not part of our network, and because of that, we can't determine your MAC address.";
    }
} catch(Exception $e) {
    echo "We're sorry, but we can't determine your MAC address right now.";
}
?>
        </h1>
    </body>
</html>