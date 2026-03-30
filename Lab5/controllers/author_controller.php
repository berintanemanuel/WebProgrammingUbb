<?php
require_once "../db.php";

function getAllAuthors(){
  try {
      $database = new Database();
      $conn = $database->getConnection();

      $stmt = $conn->prepare("SELECT * FROM authors");
      $stmt->execute();

      $authors = $stmt->fetchAll(PDO::FETCH_ASSOC);

      echo json_encode($authors);

  } catch(PDOException $e) {
      echo json_encode(["error" => $e->getMessage()]);
  }
}

if(isset($_GET['action']) && $_GET['action'] == 'getAllAuthors')
  getAllAuthors();



