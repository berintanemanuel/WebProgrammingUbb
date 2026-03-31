<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Add author</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <div class="container">
    <h1>Add an author</h1>

    <form id="add-author-form">
      <div class="form-container">
        <label for="name">Name</label><br>
        <input type="text" id="name" required>
      </div>

      <div class="form-container">
        <label for="email">Email</label><br>
        <input type="text" id="email" required>
      </div>

      <div class="form-submit-container">
        <a href="./index.php">Cancel</a>
        <button type="submit" id="submit-add-author-button">Save</button>
      </div>
    </form>
  </div>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <script src="./js/add_author.js"></script>
</body>
</html>