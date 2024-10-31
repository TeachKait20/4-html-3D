const cube = document.getElementById("cube");
let rotation = 0;

function rotateCube() {
  rotation += 1;
  cube.style.transform = `rotateY(${rotation}deg)`;
}

setInterval(rotateCube, 25);
