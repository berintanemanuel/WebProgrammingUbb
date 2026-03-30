const displayAllDocuments = () => {
  let tableBody = $("#documents-table tbody");
  $.ajax({
    type: 'GET',
    url: "http://localhost/controllers/document_controller.php",
    data: {action: "getDocuments", filter: "all"},
    success: (data) => {
      let documents = JSON.parse(data);
      load_documents(tableBody, documents);
      $("#filter-information").text(`Showing all documents`)
    },
  });
}

const displayDocumentsByType = () => {
  let tableBody = $("#documents-table tbody");
  let value = $("#type").val();
  $.ajax({
    type: 'GET',
    url: "http://localhost/controllers/document_controller.php",
    data: {action: "getDocuments", filter: "type", filter_value: value},
    success: (data) => {
      let documents = JSON.parse(data);
      load_documents(tableBody, documents);
      $("#filter-information").text(`Showing all documents with type = ${value}`)
    }
  });
}

const displayDocumentsByFormat = () => {
  let tableBody = $("#documents-table tbody");
  let value = $("#format").val();
  $.ajax({
    type: 'GET',
    url: "http://localhost/controllers/document_controller.php",
    data: {action: "getDocuments", filter: "format", filter_value: value},
    success: (data) => {
      let documents = JSON.parse(data);
      load_documents(tableBody, documents);
      $("#filter-information").text(`Showing all documents with format = ${value}`)
    }
  });
}

const load_documents = (tableBody, documents) => {
  tableBody.html("");
  documents.forEach(document=> {
    tableBody.append(`
      <tr>
        <td>${document.id}</td>
        <td>${document.title}</td>
        <td>${document.number_of_pages}</td>
        <td>${document.type}</td>
        <td>${document.format}</td>
        <td>${document.author}</td>
      </tr>
    `);
  });
}

$(document).ready(function() {
  displayAllDocuments();
  $("#show-all-btn").click(function(){displayAllDocuments()});
  $("#show-by-type-btn").click(function(){displayDocumentsByType()});
  $("#show-by-format-btn").click(function(){displayDocumentsByFormat()});
});