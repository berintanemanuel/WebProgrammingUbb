box = document.getElementById("box");

boxIsDragged = false;
mouseX = 0;
mouseY  = 0;

document.addEventListener('mousemove', (e) =>{
  mouseX = e.clientX;
  mouseY = e.clientY;
  if(boxIsDragged){
    //console.log(mouseX, mouseY);
    box.style.left = `${Math.max(box.offsetWidth / 2, Math.min(mouseX, window.innerWidth - box.offsetWidth / 2)) - box.offsetWidth / 2}px`;
    box.style.top = `${Math.max(box.offsetHeight / 2, Math.min(mouseY, window.innerHeight - box.offsetHeight / 2)) - box.offsetHeight / 2}px`;
  }
});

box.addEventListener("mousedown", (event) => {
  event.preventDefault(); /// So that the text is not selected
  boxIsDragged = true;
});

document.addEventListener('mouseup', (e) => {
  boxIsDragged = false;
});
