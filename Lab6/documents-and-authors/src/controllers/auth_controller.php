<?php

header("Access-Control-Allow-Origin: http://localhost:4200");

header("Access-Control-Allow-Methods: POST, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type, Authorization");

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

require_once "../db.php";

function login(){
  $data = json_decode(file_get_contents("php://input"));

  if (!$data) {
      http_response_code(400);

      echo json_encode([
          "message" => "Invalid request"
      ]);

      exit;
  }

  $username = trim($data->username);
  $password = trim($data->password);

  try {

      $database = new Database();

      $conn = $database->getConnection();

      $stmt = $conn->prepare(
          "SELECT * FROM users
          WHERE username = :username
          AND password = :password"
      );

      $stmt->bindParam(":username", $username);

      $stmt->bindParam(":password", $password);

      $stmt->execute();

      $user = $stmt->fetch(PDO::FETCH_ASSOC);

      if ($user) {

          // fake/simple token
          $token = base64_encode($username . ":" . time());

          echo json_encode([
              "token" => $token
          ]);

      } else {

          http_response_code(401);

          echo json_encode([
              "message" => "Invalid credentials"
          ]);
      }

  } catch(PDOException $e) {

      http_response_code(500);

      echo json_encode([
          "message" => $e->getMessage()
      ]);
  }
}

function register(){
  $data = json_decode(file_get_contents("php://input"));

  if (!$data) {

      http_response_code(400);

      echo json_encode([
          "message" => "Invalid request"
      ]);

      exit;
  }

  $username = trim($data->username);
  $password = trim($data->password);

  try {

      $database = new Database();

      $conn = $database->getConnection();

      // Check existing username
      $checkStmt = $conn->prepare(
          "SELECT COUNT(*) FROM users
          WHERE username = :username"
      );

      $checkStmt->bindParam(
          ":username",
          $username);

      $checkStmt->execute();

      if ($checkStmt->fetchColumn() > 0) {

          http_response_code(400);

          echo json_encode([
              "message" => "Username already exists"
          ]);

          exit;
      }

      // Insert new user
      $stmt = $conn->prepare(
          "INSERT INTO users(username, password)
          VALUES(:username, :password)"
      );

      $stmt->bindParam(
          ":username",
          $username);

      $stmt->bindParam(
          ":password",
          $password);

      $stmt->execute();

      echo json_encode([
          "message" => "User registered successfully"
      ]);

  } catch(PDOException $e) {

      http_response_code(500);

      echo json_encode([
          "message" => $e->getMessage()
      ]);
  }
}

if ($_GET['action'] == 'login') {
    login();
}

if ($_GET['action'] == 'register') {
    register();
}
?>
