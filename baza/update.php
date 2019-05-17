<?php

/**
  * List all users with a link to edit
  */


  
try {
  require "config.php";
  require "common.php";

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

<h2>Azuriraj korisnika</h2>

<table>
  <thead>
    <tr>
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
        <td><a href="update-single.php?id=<?php echo escape($row["id"]); ?>">Uredi</a></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
</table>

<a href="index.php">Povratak na pocetnu</a>

<?php require "templates/footer.php"; ?>