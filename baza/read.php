<?php

/**
  * Function to query information based on
  * a parameter: in this case, location.
  *
  */

  
if (isset($_POST['submit'])) {
  try {
    require "config.php";
    require "common.php";

    $connection = new PDO($dsn, $username, $password, $options);

    $sql = "SELECT *
    FROM customers
    WHERE addressLine1 = :addressLine1";

    $addressLine1 = $_POST['addressLine1'];

    $statement = $connection->prepare($sql);
    $statement->bindParam(':addressLine1', $addressLine1, PDO::PARAM_STR);
    $statement->execute();

    $result = $statement->fetchAll();
  } catch(PDOException $error) {
    echo $sql . "<br>" . $error->getMessage();
  }
}
?>
<?php require "templates/header.php"; ?>

<?php
if (isset($_POST['submit'])) {
  if ($result && $statement->rowCount() > 0) { ?>
    <h2>Rezultat</h2>

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
  <?php foreach ($result as $row) { ?>
      <tr>
<td><?php echo escape($row["id"]); ?></td>
<td><?php echo escape($row["customerName"]); ?></td>
<td><?php echo escape($row["contactLastName"]); ?></td>
<td><?php echo escape($row["contactFirstName"]); ?></td>
<td><?php echo escape($row["phone"]); ?></td>
<td><?php echo escape($row["addressLine1"]); ?></td>
<td><?php echo escape($row["date"]); ?> </td>
      </tr>
    <?php } ?>
      </tbody>
  </table>
  <?php } else { ?>
    > Nismo nasli rezultate za <?php echo escape($_POST['addressLine1']); ?>.
  <?php }
} ?>

<h2>Pronadi korisnika prema adresi</h2>

<form method="post">
  <label for="addressLine1">Adresa</label>
  <input type="text" id="addressLine1" name="addressLine1">
  <input type="submit" name="submit" value="Pogledaj rezultate">
</form>

<a href="index.php">Povratak na pocetnu</a>

<?php require "templates/footer.php"; ?>