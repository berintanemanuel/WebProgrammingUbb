const editDocument = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let document_id = urlParams.get("document_id");
  let title = $("#title").val();
  let nopages = $("#nopages").val();
  let type = $("#type").val();
  let format = $("#format").val();

  let doc = {
    title: title,
    nopages: nopages,
    type: type,
    format: format,
  };

  $.ajax({
    type: 'POST',
    url: "http://localhost/controllers/document_controller.php",
    data: {
      action: "editDocument",
      id: document_id,
      document: JSON.stringify(doc)
    },
    success: () => {
      window.location.href = "../list_documents.php";
    },
  });

}

$(document).ready(function(){
  $("#submit-edit-document-button").click(function(e){
    e.preventDefault();
    editDocument();
  });
});