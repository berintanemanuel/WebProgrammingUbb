const displayAllAuthors = () => {
  let tableBody = $("#authors-table tbody");
  $.ajax({
    type: 'GET',
    url: "http://localhost/controllers/author_controller.php",
    data: {action: "getAllAuthors"},
    success: (data) => {
      authors = JSON.parse(data);
      load_authors(tableBody, authors);
    },
  });
};

const load_authors = (tableBody, authors) => {
  tableBody.html("");
  authors.forEach(author => {
    tableBody.append(`
      <tr>
        <td>${author.id}</td>
        <td>${author.name}</td>
        <td>${author.email}</td>
        <td><button onclick="redirect_to_add_document_page(${author.id})">Add</button></td>
      </tr>
    `);
  });
}

const goHome = () => {
  window.location.href=`../index.html`;
}

function redirect_to_add_document_page(author_id){
  window.location.href=`../add_document.html?author_id=${author_id}`;
}

$(document).ready(function() {
  displayAllAuthors();
  $("#go-home-btn").click(function(){goHome()});
});