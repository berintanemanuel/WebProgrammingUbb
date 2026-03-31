const displayAllDocuments = () => {

  localStorage.setItem("filter-by", "all");
  localStorage.removeItem("filter-value");

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

  localStorage.setItem("filter-by", "type");
  localStorage.setItem("filter-value", value);

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

  localStorage.setItem("filter-by", "format");
  localStorage.setItem("filter-value", value);

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

const deleteDocument = (id) => {
  if (!confirm("Are you sure you want to delete this document?")) {
    return;
  }

  $.ajax({
    type: 'POST',
    url: "http://localhost/controllers/document_controller.php",
    data: {
      action: "deleteDocument",
      id: id
    },
    success: () => {
      displayFiltered(); 
    },
    error: (err) => {
      console.error("Delete error:", err);
    }
  });
};

const editDocument = (id) => {
  window.location.href=`../edit_document.html?document_id=${id}`;
}

const goHome = () => {
  window.location.href=`../index.html`;
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
        <td>
          <button onclick="editDocument(${document.id})">Edit</button>
        </td>
        <td>
          <button onclick="deleteDocument(${document.id})">Delete</button>
        </td>
      </tr>
    `);
  });
}

function displayDocumentsByTypePrevious(type){
  $("#type").val(type);
  let tableBody = $("#documents-table tbody");
  $.ajax({
    type: 'GET',
    url: "http://localhost/controllers/document_controller.php",
    data: {action: "getDocuments", filter: "type", filter_value: type},
    success: (data) => {
      let documents = JSON.parse(data);
      load_documents(tableBody, documents);
      $("#filter-information").text(`Showing all documents with type = ${type}`)
    }
  });
}

function displayDocumentsByFormatPrevious(format){
  $("#format").val(format);
  let tableBody = $("#documents-table tbody");
  $.ajax({
    type: 'GET',
    url: "http://localhost/controllers/document_controller.php",
    data: {action: "getDocuments", filter: "format", filter_value: format},
    success: (data) => {
      let documents = JSON.parse(data);
      load_documents(tableBody, documents);
      $("#filter-information").text(`Showing all documents with type = ${format}`)
    }
  });
}

function displayFiltered(){
  if(localStorage.getItem("filter-by") === 'all')
    displayAllDocuments();
  else if(localStorage.getItem("filter-by") === 'type')
    displayDocumentsByTypePrevious(localStorage.getItem("filter-value"));
  else if(localStorage.getItem("filter-by") === 'format')
    displayDocumentsByFormatPrevious(localStorage.getItem("filter-value"));
  else
    displayAllDocuments();
}

$(document).ready(function() {
  //displayAllDocuments();
  displayFiltered();
  $("#show-all-btn").click(function(){displayAllDocuments()});
  $("#show-by-type-btn").click(function(){displayDocumentsByType()});
  $("#show-by-format-btn").click(function(){displayDocumentsByFormat()});
  $("#go-home-btn").click(function(){goHome()});
});