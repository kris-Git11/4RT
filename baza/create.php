<?php

if (isset($_POST['submit'])) {
  require "config.php";
  require "common.php";

  try {
    $connection = new PDO($dsn, $username, $password, $options);

    $new_user = array(
      "customerName" => $_POST['customerName'],
      "contactLastName"  => $_POST['contactLastName'],
      "contactFirstName"     => $_POST['contactFirstName'],
      "phone"       => $_POST['phone'],
      "addressLine1"  => $_POST['addressLine1']
    );

    $sql = sprintf(
"INSERT INTO %s (%s) values (%s)",
"customers",
implode(", ", array_keys($new_user)),
":" . implode(", :", array_keys($new_user))
    );

    $statement = $connection->prepare($sql);
    $statement->execute($new_user);
  } catch(PDOException $error) {
    echo $sql . "<br>" . $error->getMessage();
  }

}
?>

<?php require "templates/header.php"; ?>

<?php if (isset($_POST['submit']) && $statement) { ?>
  - <?php echo $_POST['customerName']; ?> uspjesno dodan.
<?php } ?>

<h2>Dodaj korisnika</h2>

<form method="post">
  <label for="customerName">Ime klijenta</label>
  <input type="text" name="customerName" id="customerName">
  <label for="contactLastName ">Prezime Kontakta u imeniku</label>
  <input type="text" name="contactLastName" id="contactLastName ">
  <label for="contactFirstName">Ime Kontakta u imeniku</label>
  <input type="text" name="contactFirstName" id="contactFirstName">
  <label for="phone">Broj mobitela</label>
  <input type="text" name="phone" id="phone">
  <label for="addressLine1">Adresa</label>
  <input type="text" name="addressLine1" id="addressLine1">
  <input type="submit" name="submit" value="Posalji">
</form>

<a href="index.php">Vrati se na pocetnu</a>

<?php require "templates/footer.php"; ?>