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

function getDocumentsByType($type){
  try {
      $database = new Database();
      $conn = $database->getConnection();

      $stmt = $conn->prepare("SELECT * FROM documents WHERE type = :type");
      $stmt->bindParam(":type", $type);
      $stmt->execute();

      $documents = $stmt->fetchAll(PDO::FETCH_ASSOC);

      echo json_encode($documents);

  } catch(PDOException $e) {
      echo json_encode(["error" => $e->getMessage()]);
  }
}

function getDocumentsByFormat($format){
  try {
      $database = new Database();
      $conn = $database->getConnection();

      $stmt = $conn->prepare("SELECT * FROM documents WHERE format = :format");
      $stmt->bindParam(":format", $format);
      $stmt->execute();

      $documents = $stmt->fetchAll(PDO::FETCH_ASSOC);

      echo json_encode($documents);

  } catch(PDOException $e) {
      echo json_encode(["error" => $e->getMessage()]);
  }
}

function deleteDocument($id){
  try {
      $database = new Database();
      $conn = $database->getConnection();

      $stmt = $conn->prepare("DELETE FROM documents WHERE id = :id");
      $stmt->bindParam(":id", $id, PDO::PARAM_INT);

      if ($stmt->execute()) {
          echo "success";
      } else {
          echo "Error deleting document.";
      }

  } catch(PDOException $e) {
      echo "Error: " . $e->getMessage();
  }
}

function editDocument($id, $doc){
  try {
      $database = new Database();
      $conn = $database->getConnection();

      $stmt = $conn->prepare("UPDATE documents SET title = :title, number_of_pages = :nopages, type = :type, format = :format WHERE id = :id");
      $stmt->bindParam(":title", $doc->{"title"});
      $stmt->bindParam(":nopages", $doc->{"nopages"});
      $stmt->bindParam(":type", $doc->{"type"});
      $stmt->bindParam(":format", $doc->{"format"});
      $stmt->bindParam(":id", $id, PDO::PARAM_INT);

      if ($stmt->execute()) {
          echo "success";
      } else {
          echo "Error deleting document.";
      }

  } catch(PDOException $e) {
      echo "Error: " . $e->getMessage();
  }
}

function getDocumentById($id){
  try {
      $database = new Database();
      $conn = $database->getConnection();

      $stmt = $conn->prepare("SELECT * FROM documents WHERE id = :id");
      $stmt->bindParam(":id", $id, PDO::PARAM_INT);
      $stmt->execute();

      $doc = $stmt->fetch(PDO::FETCH_ASSOC);

      echo json_encode($doc);

  } catch(PDOException $e) {
      echo json_encode(["error" => $e->getMessage()]);
  }
}

if(isset($_POST["action"]) && $_POST["action"] == 'addDocument'){
  $document = json_decode($_POST["document"]);
  add_document($document->{'title'}, $document->{'nopages'}, $document->{'type'}, $document->{'format'}, $document->{'author_id'});
}

if(isset($_GET['action']) && $_GET['action'] == 'getDocuments'){
  if($_GET['filter'] == 'all')
    getAllDocuments();
  else if($_GET['filter'] == 'type'){
    getDocumentsByType($_GET['filter_value']);
  }
  else if ($_GET['filter'] == 'format'){
    getDocumentsByFormat($_GET['filter_value']);
  }
}

if(isset($_POST["action"]) && $_POST["action"] == 'deleteDocument'){
  deleteDocument($_POST["id"]);
}

if(isset($_POST["action"]) && $_POST["action"] == 'editDocument'){
  $doc = json_decode($_POST["document"]);
  editDocument($_POST["id"], $doc);
}

if(isset($_GET["action"]) && $_GET["action"] == "getDocumentById"){
  getDocumentById($_GET["id"]);
}