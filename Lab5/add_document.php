<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Add a document</title>
  <link rel="stylesheet" href="./styles.css">
</head>
<body>
  <div class="container">
    <h1>Add an author</h1>
    <form method="post" id="add-author-form">
      <div class="form-container">
        <label for="name">Title</label><br>
        <input type="text" name="name" id="name" required>
      </div>
      <div class="form-container">
        <label for="email">Number of pages</label><br>
        <input type="number" name="nopages" id="nopages" required>
      </div>
      <div class="form-container">
        <label for="type">Type</label><br>
        <input type="text" name="type" id="type" required>
      </div>
      <div class="form-container">
        <label for="format">Format</label><br>
        <input type="text" name="format" id="format" required>
      </div>
      <div class="form-submit-container">
        <a href="./index.php" class="cancel-add-document">Cancel</a>
        <button type="submit" id="submit-add-document-button">Save</button>
      </div>
    </form>
  </div>
</body>
</html>
