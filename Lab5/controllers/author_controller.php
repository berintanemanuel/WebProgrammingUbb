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

function addAuthor($name, $email){
  try {
      $database = new Database();
      $conn = $database->getConnection();

      $stmt = $conn->prepare("INSERT INTO authors (name, email) VALUES (:name, :email)");
      $stmt->bindParam(":name", $name);
      $stmt->bindParam(":email", $email);

      if ($stmt->execute()) {
          echo "success";
      } else {
          echo "Error inserting author.";
      }

  } catch(PDOException $e) {
      echo "Error: " . $e->getMessage();
  }
}

if(isset($_GET['action']) && $_GET['action'] == 'getAllAuthors')
  getAllAuthors();

if(isset($_POST["action"]) && $_POST["action"] == "addAuthor"){
  $author = json_decode($_POST["author"]);

  $name = trim($author->name);
  $email = trim($author->email);

  if(empty($name)){
    echo "Name cannot be empty!";
    return;
  }

  if(empty($email)){
    echo "Email cannot be empty!";
    return;
  }

  if(!preg_match("/^[^@]+@[^@]+\.[^@]+$/", $email)){
    echo "Invalid email format!";
    return;
  }

  addAuthor($name, $email);
}


