const isValidEmail = (email) => {
  // simple validation: something@something.something
  const regex = /^[^@]+@[^@]+\.[^@]+$/;
  return regex.test(email);
};

const addAuthor = () => {
  let name = $("#name").val().trim();
  let email = $("#email").val().trim();

  // 🔴 VALIDATION
  if (!name) {
    alert("Name cannot be empty!");
    return;
  }

  if (!email) {
    alert("Email cannot be empty!");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Invalid email format!");
    return;
  }

  let author = {
    name: name,
    email: email
  };

  $.ajax({
    type: 'POST',
    url: "http://localhost/controllers/author_controller.php",
    data: {
      action: "addAuthor",
      author: JSON.stringify(author)
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
};

$(document).ready(function(){
  $("#submit-add-author-button").click(function(e){
    e.preventDefault();
    addAuthor();
  });
});