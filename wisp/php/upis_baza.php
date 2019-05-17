<?php
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
?>