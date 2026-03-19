box = document.getElementById("box");

boxIsDragged = false;
mouseX = 0;
mouseY  = 0;

function hello(){
  console.log(mouseX, mouseY);
}

document.addEventListener('mousemove', (e) =>{
  mouseX = e.clientX;
  mouseY = e.clientY;
  if(boxIsDragged){
    console.log(mouseX, mouseY);
    box.style.left = `${Math.max(mouseX, 0)}px`;
    box.style.top = `${Math.max(mouseY, 0)}px`;
  }
});

box.addEventListener("mousedown", (event) => {
  event.preventDefault(); /// So that the text is not selected
  boxIsDragged = true;
});

document.addEventListener('mouseup', (e) => {
  boxIsDragged = false;
});
