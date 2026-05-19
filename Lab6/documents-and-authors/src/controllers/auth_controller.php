<?php

header("Access-Control-Allow-Origin: http://localhost:4200");

header("Access-Control-Allow-Methods: POST, OPTIONS");

header("Access-Control-Allow-Headers: Content-Type, Authorization");

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

require_once "../db.php";

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
?>