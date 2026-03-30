<?php
require_once "../db.php";

function add_document($title, $nopages, $type, $format, $author_id){
  try {
      $database = new Database();
      $conn = $database->getConnection();

      $query = "INSERT INTO documents (title, number_of_pages, type, format, author) 
                VALUES (:title, :nopages, :type, :format, :author)";
      
      $stmt = $conn->prepare($query);

      $stmt->bindParam(":title", $title);
      $stmt->bindParam(":nopages", $nopages);
      $stmt->bindParam(":type", $type);
      $stmt->bindParam(":format", $format);
      $stmt->bindParam(":author", $author_id);

      if ($stmt->execute()) {
          header("Location: ../index.php");
          exit();
      } else {
          echo "Error inserting document.";
      }
  } catch (PDOException $e) {
      echo "Error: " . $e->getMessage();
  }
}

function getAllDocuments(){
  try {
      $database = new Database();
      $conn = $database->getConnection();

      $stmt = $conn->prepare("SELECT * FROM documents");
      $stmt->execute();

      $documents = $stmt->fetchAll(PDO::FETCH_ASSOC);

      echo json_encode($documents);

  } catch(PDOException $e) {
      echo json_encode(["error" => $e->getMessage()]);
  }
}

if(isset($_POST["action"]) && $_POST["action"] == 'addDocument'){
  $document = json_decode($_POST["document"]);
  add_document($document->{'title'}, $document->{'nopages'}, $document->{'type'}, $document->{'format'}, $document->{'author_id'});
}

if(isset($_GET['action']) && $_GET['action'] == 'getAllDocuments')
  getAllDocuments();