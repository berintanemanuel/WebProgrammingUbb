$("#clickMeBtn").on("click", function(event){
  event.preventDefault();

  $("#firstName").prop("disabled", true);
  $("#lastName").prop("disabled", true);
  $("#email").prop("disabled", true);
  $("#description").prop("disabled", true);
  $("#observations").prop("disabled", true);

  $("#grayDiv").show();
  $("#modalWindow").show();
});

function enableFormButtons(){
  form_ids = ["#firstName", "#lastName", "#email", "#description", "#observations"];
  $.each(form_ids, function(idx, id){
    $(id).prop("disabled", false);
  });
}

$(".submitButton").on('click', function(){
  let computedString = "";
  //computedString += $(".clubInput").val();
  //computedString += $(".nationalityInput").val();
  //computedString += $(".positionInput").val();
  //computedString += $(".fullNameInput").val();

  classes = [".clubInput", ".nationalityInput", ".positionInput", ".fullNameInput"];
  $.each(classes, function(idx, name){
    //console.log(name);
    computedString += $(name).val();
  });

  let newText = $("#firstName").val() + computedString;
  $("#firstName").val(newText);

  enableFormButtons();

  $("#grayDiv").hide();
  $("#modalWindow").hide();
});