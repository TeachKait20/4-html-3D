# 5-html-css-js-3D
## Управление 3D объектами в html, css, js

<img src="https://github.com/TeachKait20/NoneCode/blob/main/3D+html/cube-rotate.gif?raw=true" width="200">


Для создания и работы с 3D-объектами в HTML, CSS и JavaScript можно использовать несколько методов и свойств, особенно с помощью CSS для базовых 3D-эффектов и JavaScript с WebGL для более сложных 3D-сцен. <br><br>
В файлах вы сможете найти "Создание объекта" - тот, что создаётся по ходу изучения, "3D куб" - дополнительные файлы для общего понимания и "3D model_1" - сделанную с помощью дополнительных средств страницу с 3D моделью. 

## CSS 3D Трансформации
CSS позволяет применять базовые 3D-эффекты к HTML-элементам без использования JavaScript. Некоторые свойства для этого:

* `transform` — поддерживает 3D-трансформации, такие как вращение, масштабирование, перемещение.
* `rotateX(deg)` — вращает элемент вокруг оси X.
* `rotateY(deg)` — вращает элемент вокруг оси Y.
* `rotateZ(deg)` — вращает элемент вокруг оси Z.
* `translate3d(x, y, z)` — перемещает элемент в трёхмерном пространстве.
* `scale3d(x, y, z)` — масштабирует элемент в трехмерном пространстве.
`perspective` — задает перспективу для 3D-преобразований, что делает объекты ближе к камере больше, а дальше — меньше.

### Создание объекта

index.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <div class="box">3D Box</div>
    </div>
</body>
</html>
```
style.css:
```css
.container {
    perspective: 1000px;
    width: 200px;
    height: 200px;
}

.box {
    width: 100px;
    height: 100px;
    background-color: lightblue;
    transform: rotateY(45deg);
    transform-style: preserve-3d;
}
```
На выходе получаем:

![image](https://github.com/user-attachments/assets/e47b8694-a7b7-4447-87ee-45d4a766f265)

## CSS анимации

Анимации с использованием `@keyframes` в CSS также работают с 3D-преобразованиями. Определение `@keyframes` начинается с указания ключевых моментов анимации, например, начального `(0% или from)` и конечного `(100% или to)`.

**Пример:**
```css
.element {
    animation-name: myAnimation;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-iteration-count: infinite; /* Бесконечная анимация */
}
```
1. `animation-name` — указывает название анимации, созданной с помощью `@keyframes`.
2. `animation-duration` — определяет, сколько времени будет длиться один цикл анимации (например, `2s, 500ms`).
3. `animation-timing-function` — устанавливает тайминг-функцию для анимации, которая влияет на скорость в разные моменты:
* `linear` — постоянная скорость;
* `ease` — медленное начало и конец, быстрая середина;
* `ease-in` — медленный старт;
* `ease-out` — медленное окончание;
* `ease-in-out` — медленный старт и конец.
4. `animation-delay` — задержка перед началом анимации.
5. `animation-iteration-count` — количество повторений анимации (можно использовать infinite для бесконечного повторения).
6. `animation-direction` — задаёт направление выполнения:
* `none` — возвращает элемент к исходному состоянию;
* `forwards` — сохраняет конечное состояние;
* `backwards` — сохраняет начальное состояние;
* `both` — сохраняет начальное и конечное состояние в зависимости от направления.
7. `animation-play-state` — управляет проигрыванием анимации (running — запущено, paused — приостановлено).

### Создание объекта
Добавляем к CSS файлу анимацию вращения
```css
@keyframes spin {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(360deg); }
}
.box {
    animation: spin 5s infinite linear;
}
```

На выходе получаем:

<img src="https://github.com/TeachKait20/NoneCode/blob/main/3D+html/rotate-obj.gif?raw=true">

## JS управление
Для добавления вращения элемента при движении мыши можно использовать JavaScript, чтобы отследить движения мыши и обновить `transform` свойства элемента. Давайте добавим обработчики событий для мыши и реализуем вращение фигуры на основе её положения. <br><br>
При этом анимацю CSS необходимо убрать или поместить в комментарий.
```javascript
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
```
**Флаги и переменные:**
* `isMouseDown` отслеживает, нажата ли мышь, а rotationX и rotationY хранят текущий угол вращения.
**Обработчики событий:**
* mousedown включает `isMouseDown`, чтобы указать начало вращения.
* mouseup отключает `isMouseDown`, прекращая вращение.
* mousemove отслеживает движение мыши и обновляет углы `rotationX` и `rotationY` на основе `movementX` и `movementY`, меняя угол вращения на основании перемещений мыши.

На выходе получаем:

<img src="https://github.com/TeachKait20/NoneCode/blob/main/3D+html/rotate-obj-js.gif?raw=true">

## JavaScript и WebGL

Для более сложных 3D-сцен JavaScript и WebGL предлагают мощные возможности:

* **WebGL** — интерфейс JavaScript для рендеринга интерактивной 3D-графики в браузере с помощью HTML5 <canvas>. WebGL позволяет работать на более низком уровне с 3D-объектами и текстурами. <br><br>
* **Three.js** — библиотека для работы с WebGL, упрощающая создание и манипуляцию 3D-объектами. Основные методы:

## Сторонние сервисы

Model Viewer — это библиотека от Google, позволяющая встраивать 3D-модели в веб-страницы с минимальными усилиями. Она работает на основе WebGL и WebXR, что позволяет просматривать модели не только в браузере, но и на устройствах с поддержкой дополненной реальности.<br><br>
* Ссылка: [Model Viewer](https://modelviewer.dev/)
* Ссылка на сайт с библиотекой 3D моделей. После регистрации вам будут доступны множество моделей: [sketchfab](https://sketchfab.com/feed)

Создадим новую страницу, на ней мы представим новую машину в "игре". Найдите необходимую модель и скачайте в папку проекта. Например:<br>

![image](https://github.com/user-attachments/assets/972c95a3-b1a1-4482-a420-8cf3fd29098b)


1. Перейдите на сайт Model Viewer и начните работу с новой моделью.

![image](https://github.com/user-attachments/assets/b2d0d60e-e9d7-47b3-867f-20ad29983822)

2. Перетащите вашу модель в появившееся окно. Справа вы увидите все параметры для работы с моделью.

![image](https://github.com/user-attachments/assets/2743b398-e287-4402-92a9-d8ef6416578e)

3. После редактирование (если оно было) библиотеку помещаем в head страницы, а ссылку на параметры 3D модели в body страницы.
* библиотека: `<script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>`
* ссылку на параметры 3D модели: ![image](https://github.com/user-attachments/assets/f7742251-9bcf-4cac-bcac-e06f4e5a2de0)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D model car</title>

    <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
</head>
<body>

    <model-viewer src="vaz_2107.glb" ar ar-modes="webxr scene-viewer quick-look" camera-controls tone-mapping="agx" poster="poster.webp" shadow-intensity="1.1" exposure="1" shadow-softness="0.78"></model-viewer>

</body>
</html>
```
На выходе получаем:

<img src="https://github.com/TeachKait20/NoneCode/blob/main/3D+html/3d-car.gif?raw=true">

Добавляем информацию и подключаем css:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D model car</title>
    <link rel="stylesheet" href="style.css">
    <!-- fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Itim&display=swap" rel="stylesheet">

    <script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"></script>
</head>
<body>
    <h1>Drive Legends: Classics Reborn</h1>

    <div id="content">
        <div id="description">
            <p>Встречайте обновлённый VAZ 2107 — легендарную классику в современной интерпретации! Эта модель, переработанная с нуля, добавлена в игру, чтобы перенести вас в атмосферу ностальгии с изюминкой современности. Каждая линия и каждая деталь автомобиля детализированы до мельчайших нюансов, чтобы максимально передать характер и душу машины, оставившей свой след в истории.</p>
            <p>Особенности:</p>
            <ul>
                <li>Высокая детализация. Каждый элемент кузова, фары, бампер, и даже интерьер созданы с особым вниманием, чтобы подарить вам невероятно реалистичный опыт.</li>
                <li>Система тюнинга. Прокачайте ваш VAZ 2107 как захотите! Доступны варианты для улучшения двигателя, подвески, колес и кузова — от классических до спортивных.</li>
                <li>Адаптация под любой стиль езды. Подходит как для городской езды, так и для дрифта и гонок по трассе.</li>
                <li>Поддержка AR. Вы сможете увидеть автомобиль прямо перед собой в реальной жизни благодаря технологии дополненной реальности.</li>
            </ul> 
        </div>

        <div id="car-box">
            <model-viewer 
                src="vaz_2107.glb" 
                ar 
                ar-modes="webxr scene-viewer quick-look" 
                camera-controls 
                tone-mapping="agx" 
                poster="poster.webp" 
                shadow-intensity="1.1" 
                exposure="1" 
                shadow-softness="0.78">
            </model-viewer>
        </div>
    </div>
</body>
</html>
```
```css
body {
    padding: 0;
    margin: 0;
    background-color: rgba(255, 166, 0, 0.425);

    font-family: "Itim", cursive;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    font-variation-settings: "wdth" 10;
}

h1 {
    color: black;
    font-weight: 800;
    text-align: center;
}

#content {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding: 20px;
}

#car-box {
    width: 50%;
    max-width: 600px;
    height: 450px;
    background-color: #ffffff93;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 15px;

}

model-viewer {
    width: 100%;
    height: 100%;
}

#description {
    width: 50%;
    max-width: 600px;
    height: 450px;
    background-color: #ffffff93;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 15px;
}
```

На выходе получаем:

<img src="https://github.com/TeachKait20/NoneCode/blob/main/3D+html/3D-car-2.gif?raw=true">
