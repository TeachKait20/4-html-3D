const box = document.querySelector('.box');
let isMouseDown = false; // флаг для отслеживания нажатия

let rotationX = 0;
let rotationY = 0;

// Обработчик для начала вращения (при нажатии мыши)
box.addEventListener('mousedown', (e) => {
    isMouseDown = true;
});

// Обработчик для остановки вращения (при отпускании мыши)
document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Обработчик движения мыши
document.addEventListener('mousemove', (e) => {
    if (!isMouseDown) return; // проверка, нажата ли мышь

    // Движение мыши влияет на вращение объекта
    rotationX += e.movementY * 0.5; // регулировка скорости вращения
    rotationY += e.movementX * 0.5;

    // Применение трансформации
    box.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
});