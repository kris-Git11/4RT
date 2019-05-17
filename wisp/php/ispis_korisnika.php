<?php
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "wisp";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if (!$conn) {
			die("Connection failed: " . mysqli_connect_error());
		}
		echo "	Connected successfully - WISP";

		$sql = "SELECT ID, IME, PREZIME, PROFIL, IP, MAC FROM users";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			// output data of each row
			while($row = $result->fetch_assoc()) {
				echo "
				<tr>
			<td>" . $row["ID"]. "</td>
			<td>" . $row["IME"] . "</td>
			<td>". $row["PREZIME"]. "</td>
			<td>". $row["PROFIL"]. "</td
			<td>". $row["IP"]. "</td
			<td>". $row["MAC"]. "</td>
			
				
			</tr>";
			
			}
		} else {
			echo "0 results";
		}

		$conn->close();
		?> 