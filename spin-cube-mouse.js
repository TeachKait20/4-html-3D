const cube = document.getElementById("cube");
let isDragging = false;
let previousMousePosition = {
  x: 0,
  y: 0
};

cube.addEventListener('mousedown', (event) => {
  isDragging = true;
});

cube.addEventListener('mouseup', (event) => {
  isDragging = false;
});

cube.addEventListener('mousemove', (event) => {
  if (!isDragging) {
    return;
  }

  const { clientX, clientY } = event;
  const { x, y } = previousMousePosition;

  const moveX = clientX - x;
  const moveY = clientY - y;

  cube.style.transform += `rotateX(${moveY}deg) rotateY(${moveX}deg)`;

  previousMousePosition = {
    x: clientX,
    y: clientY
  };
});

//При нажатии кнопки мыши на куб, устанавливается флаг isDragging в значение true. 
//При перемещении мыши с зажатой кнопкой, происходит вычисление смещения moveX и moveY 
//относительно предыдущей позиции мыши. Затем, с помощью свойства transform, куб поворачивается по осям X и Y 
//на соответствующие значения moveY и moveX. При отпускании кнопки мыши, флаг isDragging снова устанавливается 
//в значение false.