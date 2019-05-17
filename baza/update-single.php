<?php
/**
  * Use an HTML form to edit an entry in the
  * users table.
  *
  */
  
require "config.php";
require "common.php";
if (isset($_POST['submit'])) {
  try {
    $connection = new PDO($dsn, $username, $password, $options);
    $user =[
      "id"        => $_POST['id'],
      "customerName" => $_POST['customerName'],
      "contactLastName"  => $_POST['contactLastName'],
      "contactFirstName"     => $_POST['contactFirstName'],
      "phone"       => $_POST['phone'],
      "addressLine1"  => $_POST['addressLine1'],
      "date"      => $_POST['date']
    ];

    $sql = "UPDATE customers
            SET id = :id,
              customerName = :customerName,
              contactLastName = :contactLastName,
              contactFirstName = :contactFirstName,
              phone = :phone,
              addressLine1 = :addressLine1,
              date = :date
            WHERE id = :id";

  $statement = $connection->prepare($sql);
  $statement->execute($user);
  } catch(PDOException $error) {
      echo $sql . "<br>" . $error->getMessage();
  }
}

if (isset($_GET['id'])) {
  try {
    $connection = new PDO($dsn, $username, $password, $options);
    $id = $_GET['id'];
    $sql = "SELECT * FROM customers WHERE id = :id";
    $statement = $connection->prepare($sql);
    $statement->bindValue(':id', $id);
    $statement->execute();

    $user = $statement->fetch(PDO::FETCH_ASSOC);
  } catch(PDOException $error) {
      echo $sql . "<br>" . $error->getMessage();
  }
} else {
    echo "Nešto je pošlo po zlu!";
    exit;
}
?>

<?php require "templates/header.php"; ?>

<?php if (isset($_POST['submit']) && $statement) : ?>
  <?php echo escape($_POST['customerName']); ?> uspjepsno azuriran.
<?php endif; ?>

<h2>Uredi korisnika</h2>

<form method="post">
    <?php foreach ($user as $key => $value) : ?>
      <label for="<?php echo $key; ?>"><?php echo ucfirst($key); ?></label>
      <input type="text" name="<?php echo $key; ?>" id="<?php echo $key; ?>" value="<?php echo escape($value); ?>" <?php echo ($key === 'id' ? 'readonly' : null); ?>>
    <?php endforeach; ?>
    <input type="submit" name="submit" value="Posalji">
</form>

<a href="index.php">Povratak na pocetnu</a>

<?php require "templates/footer.php"; ?>