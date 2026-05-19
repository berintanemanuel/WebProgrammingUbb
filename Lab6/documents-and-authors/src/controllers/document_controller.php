<?php

header("Access-Control-Allow-Origin: http://localhost:4200");

// 2. Allow the methods you are using
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// 3. Allow specific headers (Angular sends 'Content-Type' for POSTs)
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

$headers = getallheaders();

if (!isset($headers['Authorization'])) {

    http_response_code(401);

    echo json_encode([
        "message" => "Unauthorized"
    ]);

    exit;
}

// 4. Handle "Preflight" requests
// Browsers send an OPTIONS request before a POST to check permissions
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

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
        echo json_encode(["status" => "success"]);
      } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Error inserting document."]);
      }
  } catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
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
          echo json_encode(["status" => "success"]);
      } else {
          http_response_code(500);
          echo json_encode(["status" => "error", "message" => "Error deleting document"]);
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
      $stmt->bindParam(":nopages", $doc->{"number_of_pages"});
      $stmt->bindParam(":type", $doc->{"type"});
      $stmt->bindParam(":format", $doc->{"format"});
      $stmt->bindParam(":id", $id, PDO::PARAM_INT);

      if ($stmt->execute()) {
          echo json_encode(["status" => "success"]);
      } else {
          http_response_code(500);
          echo json_encode(["status" => "error", "message" => "Error editing document"]);
      }

  } catch(PDOException $e) {
      echo json_encode(["error" => $e->getMessage()]);
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

  $title = trim($document->{'title'});
  $nopages = (int)$document->{'number_of_pages'};
  $type = trim($document->{'type'});
  $format = trim($document->{'format'});
  $author_id = (int)$document->{'author_id'};

  if(empty($title) || empty($type) || empty($format)){
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "All fields are required!"]);
    return;
  }

  if($nopages <= 0){
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Number of pages must be greater than 0!"]);
    return;
  }

  if($author_id <= 0){
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Invalid author"]);
    return;
  }

  add_document($title, $nopages, $type, $format, $author_id);
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
  $document = json_decode($_POST["document"]);

  $title = trim($document->{'title'});
  $nopages = (int)$document->{'number_of_pages'};
  $type = trim($document->{'type'});
  $format = trim($document->{'format'});

  if(empty($title) || empty($type) || empty($format)){
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    return;
  }

  if($nopages <= 0){
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Number of pages must be greater than 0!"]);
    return;
  }

  editDocument($_POST["id"], $document);
}

if(isset($_GET["action"]) && $_GET["action"] == "getDocumentById"){
  getDocumentById($_GET["id"]);
}