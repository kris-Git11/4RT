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

		$sql = "SELECT ID, NAZIV, BRZINA FROM profili";
		$result = $conn->query($sql);

		if ($result->num_rows > 0) {
			// output data of each row
			while($row = $result->fetch_assoc()) {
				echo "
				<tr>
			<td>" . $row["ID"]. "</td>
			<td>" . $row["NAZIV"] . "</td>
			<td>" . $row["BRZINA"] . "</td>
			
			
				
			</tr>";
			
			}
		} else {
			echo "0 results";
		}

		$conn->close();
		?> 