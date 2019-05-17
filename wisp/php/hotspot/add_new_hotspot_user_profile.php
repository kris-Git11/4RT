<?php

/* pokušaj dodavanja novog profila u hotspot
*/

require('../hotspot/routeros_api.class.php');
$API = new RouterosAPI();

if ($API->connect('192.168.56.101', 'admin', '')) {
   

  //dodavanje korisničkog profila 
   $API->comm("/ip/hotspot/user/profile/add", array(
      "name"     => "$_POST[post_naziv]",
      "rate-limit"  => "$_POST[post_x]"
   ));


}

//spajanje s bazom
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "wisp";

		// uspostava konekcije
		$connect = new mysqli($servername, $username, $password, $dbname);
//Slanje u bazu 
mysqli_query($connect,"INSERT INTO profili(ID, NAZIV, BRZINA)
VALUES (''$_POST[post_id]',
$_POST[post_naziv]',
'$_POST[post_x]')");