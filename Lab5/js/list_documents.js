const displayAllDocuments = () => {
  let tableBody = $("#documents-table tbody");
  $.ajax({
    type: 'GET',
    url: "http://localhost/controllers/document_controller.php",
    data: {action: "getAllDocuments"},
    success: (data) => {
      documents = JSON.parse(data);
      load_documents(tableBody, documents);
    },
  });
}

const load_documents = (tableBody, documents) => {
  tableBody.html("");
  documents.forEach(document=> {
    tableBody.append(`
      <tr>
        <td>${document.id}</td>
        <td>${document.title}</td>
        <td>${document.nopages}</td>
        <td>${document.type}</td>
        <td>${document.format}</td>
        <td>${document.author}</td>
      </tr>
    `);
  });
}

$(document).ready(function() {
  displayAllDocuments();
});