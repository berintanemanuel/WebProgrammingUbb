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
    box.style.left = `${mouseX}px`;
    box.style.top = `${mouseY}px`;
  }
});

box.addEventListener("mousedown", () => {
  boxIsDragged = true;
});

document.addEventListener('mouseup', (e) => {
  boxIsDragged = false;
});
