
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>Baza podataka klijenta</title>

    <link rel="stylesheet" href="css/style.css" />
  </head>

  <body>
    <h1></h1>
<?php include "templates/header.php"; ?>

    <ul>
      <li>
        <a href="create.php"><strong>Kreiranje</strong></a> - dodaj klijenta
      </li>
      <li>
        <a href="read.php"><strong>Citaj</strong></a> - pronadi klijenta
      </li>
	   <li><a href="update.php"><strong>Azuriraj</strong></a> - promjeni podatke klijenta</li>
	   <li>
    <a href="delete.php"><strong>Obrisi</strong></a> - obrisi klijenta
  </li>
    </ul>
	<?php include "templates/footer.php"; ?>
  </body>
</html>
