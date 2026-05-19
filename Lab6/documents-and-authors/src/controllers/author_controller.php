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

function getAllAuthors(){
  header('Content-Type: application/json');
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
          // Send a JSON object instead of a plain string
          echo json_encode(["status" => "success", "message" => "Author added"]);
      } else {
          http_response_code(500);
          echo json_encode(["status" => "error", "message" => "Error inserting author"]);
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


