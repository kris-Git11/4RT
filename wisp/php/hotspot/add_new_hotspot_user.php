<?php

/* pokušaj dodavanja novog korisnika u hotspot
*/

require('../hotspot/routeros_api.class.php');
$API = new RouterosAPI();

if ($API->connect('192.168.56.101', 'admin', '')) {
   # Get all current hosts
   $API->write('/ip/hotspot/user/print');
   $ips = $API->read();

  #add some new
   $API->comm("/ip/hotspot/user/add", array(
      "name"     => "$_POST[post_ime] $_POST[post_prez]",
      "profile"  => "$_POST[post_profil]",
	  "limit-uptime"  => "$_POST[post_uptime]"
   ));

}

//Connecting to sql db.
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "wisp";

		// Create connection
		$connect = new mysqli($servername, $username, $password, $dbname);
//Slanje u bazu 
mysqli_query($connect,"INSERT INTO users(id, ime, prezime, profil, ip, mac)
VALUES ('$_POST[post_id]',
'$_POST[post_ime]',
 '$_POST[post_prez]',
 '$_POST[post_profil]', 
 '$_POST[post_ip]' , 
 '$_POST[post_mac]')");
