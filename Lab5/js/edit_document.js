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
    success: (response) => {
      if (response === "success") {
        window.location.href = "../list_documents.php";
      } else {
        alert(response);
      }
    },
  });

}

const loadDocumentData = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get("document_id");

  $.ajax({
    type: 'GET',
    url: "http://localhost/controllers/document_controller.php",
    data: {
      action: "getDocumentById",
      id: id
    },
    success: (data) => {
      console.log(data)
      let doc = JSON.parse(data);

      $("#title").val(doc.title);
      $("#nopages").val(doc.number_of_pages);
      $("#type").val(doc.type);
      $("#format").val(doc.format);
    }, 
    error: (err) => {
      console.error("AJAX ERROR: ", err);
    }
  });
};

$(document).ready(function(){
  loadDocumentData();
  $("#submit-edit-document-button").click(function(e){
    e.preventDefault();
    editDocument();
  });
});