<?php
require_once "db.php";

function add_document($name, $nopages, $type, $format){
  try {
      $database = new Database();
      $conn = $database->getConnection();

      $query = "INSERT INTO documents (name, number_of_pages, type, format) VALUES (:name, :nopages, :type, :format)";
      $stmt = $conn->prepare($query);

      $stmt->bindParam(":name", $name);
      $stmt->bindParam(":nopages", $nopages);
      $stmt->bindParam(":type", $type);
      $stmt->bindParam(":format", $format);

      if ($stmt->execute()) {
          // Redirect after success
          header("Location: index.php");
          exit();
      } else {
          echo "Error inserting document.";
      }
  } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
  }
}