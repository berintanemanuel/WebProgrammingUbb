const addDocument = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let author_id = urlParams.get("author_id");
  let title = $("#title").val();
  let nopages = $("#nopages").val();
  let type = $("#type").val();
  let format = $("#format").val();

  let doc = {
    title: title,
    nopages: nopages,
    type: type,
    format: format,
    author_id: author_id
  };

  $.ajax({
    type: 'POST',
    url: "http://localhost/controllers/document_controller.php",
    data: {
      action: "addDocument",
      document: JSON.stringify(doc)
    },
    success: (response) => {
      if (response === "success") {
        window.location.href = "../index.php";
      } else {
        alert(response);
      }
    },
    error: () => {
      alert("Something went wrong!");
    }
  });

}

$(document).ready(function(){
  $("#submit-add-document-button").click(function(e){
    e.preventDefault();
    addDocument();
  });
});