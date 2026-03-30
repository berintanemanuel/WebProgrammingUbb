<?php
require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];

    try {
        $database = new Database();
        $conn = $database->getConnection();

        $query = "INSERT INTO authors (name, email) VALUES (:name, :email)";
        $stmt = $conn->prepare($query);

        $stmt->bindParam(":name", $name);
        $stmt->bindParam(":email", $email);

        if ($stmt->execute()) {
            // Redirect after success
            header("Location: index.php");
            exit();
        } else {
            echo "Error inserting author.";
        }
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Add author</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <div class="container">
    <h1>Add an author</h1>
    <form method="post" id="add-author-form">
      <div class="form-container">
        <label for="name">Name</label><br>
        <input type="text" name="name" id="name" required>
      </div>
      <div class="form-container">
        <label for="email">Email</label><br>
        <input type="text" name="email" id="email" required>
      </div>
      <div class="form-submit-container">
        <a href="./index.php" class="cancel-add-hotel">Cancel</a>
        <button type="submit" id="submit-add-hotel-button">Save</button>
      </div>
    </form>
  </div>
</body>
</html>
