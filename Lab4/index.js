$("#clickMeBtn").on("click", function(event){
  event.preventDefault();
  $("#grayDiv").show();
  $("#modalWindow").show();
});

$(".submitButton").on('click', function(){
  let computedString = "";
  computedString += $(".clubInput").val();
  computedString += $(".nationalityInput").val();
  computedString += $(".positionInput").val();
  computedString += $(".fullNameInput").val();

  let newText = $("#firstName").val() + computedString;
  $("#firstName").val(newText);

  $("#grayDiv").hide();
  $("#modalWindow").hide();
});

function getStyleOfModalWindowWhenShown(){
  let style = {
    "background-color": 'white',
    "display": 'flex',
    "flex-direction": 'column',
    "justify-content": 'space-between',
    "align-items": 'center',
    "gap": '20px'
  };
  return style;
}