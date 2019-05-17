<?php

/**
  * Delete a user
  */

require "config.php";
require "common.php";

if (isset($_GET["id"])) {
  try {
    $connection = new PDO($dsn, $username, $password, $options);

    $id = $_GET["id"];

    $sql = "DELETE FROM customers WHERE id = :id";

    $statement = $connection->prepare($sql);
    $statement->bindValue(':id', $id);
    $statement->execute();

    $success = "Korisnik uspjesno obrisan!";
  } catch(PDOException $error) {
    echo $sql . "<br>" . $error->getMessage();
  }
}

try {
  $connection = new PDO($dsn, $username, $password, $options);

  $sql = "SELECT * FROM customers";

  $statement = $connection->prepare($sql);
  $statement->execute();

  $result = $statement->fetchAll();
} catch(PDOException $error) {
  echo $sql . "<br>" . $error->getMessage();
}
?>
<?php require "templates/header.php"; ?>

<h2>Obrisi korisnika</h2>

<?php if ($success) echo $success; ?>

<table>
  <thead>
	<tr>
	<th>#</th>
	<th>Ime korisnika</th>
	<th>Prezime Kontakta u imeniku</th>
	<th>Ime Kontakta u imeniku</th>
	<th>Broj mobitela</th>
	<th>Adresa</th>
	<th>Datum</th>
</tr>
  </thead>
  <tbody>
  <?php foreach ($result as $row) : ?>
    <tr>
      <td><?php echo escape($row["id"]); ?></td>
      <td><?php echo escape($row["customerName"]); ?></td>
      <td><?php echo escape($row["contactLastName"]); ?></td>
      <td><?php echo escape($row["contactFirstName"]); ?></td>
      <td><?php echo escape($row["phone"]); ?></td>
      <td><?php echo escape($row["addressLine1"]); ?></td>
      <td><?php echo escape($row["date"]); ?> </td>
      <td><a href="delete.php?id=<?php echo escape($row["id"]); ?>">Obrisi</a></td>
    </tr>
  <?php endforeach; ?>
  </tbody>
</table>

<a href="index.php">Povratak na pocetnu</a>

<?php require "templates/footer.php"; ?>