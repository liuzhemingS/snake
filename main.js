const box = document.querySelector('#box');
const resetBtn = document.querySelector('#resetBtn');
const score = document.querySelector('.score');
const e = box.getContext('2d');
const unidad = 25;
const boxWidth = box.width;
const boxHeight = box.height;
const snakeColor = 'green';
const foodColor = 'red';
const snakeBorderColor = 'darkgreen';
const backgroundColor = 'white';
let scoreText = 0;
let alive = false;
let fY;
let fX;
let xVelocity = unidad;
let yVelocity = 0;
let snake = [{x: unidad*4, y: 0}, 
             {x: unidad*3, y: 0},
             {x: unidad*2, y: 0},
             {x: unidad, y: 0},
             {x: 0, y: 0},
];
window.addEventListener("keydown", changeDirection);
empezar();
function empezar(){
    alive = true; 
    scoreText.textContent = score;
    snake = [{x: unidad*4, y: 0}, 
             {x: unidad*3, y: 0},
             {x: unidad*2, y: 0},
             {x: unidad, y: 0},
             {x: 0, y: 0},
    ];
    moveSnake();
    drawSnake();
    tick();
    genFood();
}
function genFood(){
    function randomPos(min, max){
        const random = Math.round((Math.random()*(max-min)+min)/unidad)*unidad;
        return random;
    }
    fX = randomPos(0, boxWidth - unidad)
    fY = randomPos(0, boxHeight - unidad)
    console.log(fX, fY);
}
function drawFood(){
    e.fillStyle = foodColor;
    e.fillRect(fX, fY, unidad, unidad);
}
function drawSnake(){
    e.fillStyle = snakeColor;
    e.strokeStyle = snakeBorderColor;
    snake.forEach((segment)=>{
        e.fillRect(segment.x, segment.y, unidad, unidad);
        e.strokeRect(segment.x, segment.y, unidad, unidad);
    })
}
function clear(){
    e.fillStyle = backgroundColor;
    e.clearRect(0, 0, boxWidth, boxHeight);
}
function tick(){
    if(alive){
        setTimeout(()=>{
            clear();
            drawFood();
            moveSnake();
            drawSnake();
            IsOver();
            tick();
        }, 45)
    } else{
        displayGameOver();
    }
}
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity};
    snake.unshift(head);
    if(snake[0].x == fX && snake[0].y == fY){
        score += 1;
        scoreText.textContent = score;
        genFood();
    } else{
        snake.pop();
    }
}
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 65;
    const UP = 87;
    const RIGHT = 68;
    const DOWN = 83;

    const goingUp = (yVelocity == -unidad);
    const goingDown = (yVelocity == unidad);
    const goingRight = (xVelocity == unidad);
    const goingLeft = (xVelocity == -unidad);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unidad;
            yVelocity = 0;
            break;
        case(keyPressed == UP && !goingDown):
            xVelocity = 0;
            yVelocity = -unidad;
            break;
        case(keyPressed == RIGHT && !goingLeft):
            xVelocity = unidad;
            yVelocity = 0;
            break;
        case(keyPressed == DOWN && !goingUp):
            xVelocity = 0;
            yVelocity = unidad;
            break;
    }
};
function IsOver(){
    switch(true){
        /*case (snake[0].x < 0):
            alive = false;
            break;*/
        /*case (snake[0].x >= boxWidth):
            alive = false;
            break;*/
        /*case (snake[0].y < 0):
            alive = false;
            break;*/
        /*case (snake[0].y >= boxHeight):
                alive = false;
                break;*/
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            alive = false;
        }
    }
};
function displayGameOver(){
    box.font = "50px MV Boli";
    box.fillStyle = "black";
    box.textAlign = "center";
    box.fillText("GAME OVER!", boxWidth / 2, boxHeight / 2);
    alive = false;
};
function resetGame(){
    score = 0;
    xVelocity = unidad;
    yVelocity = 0;
    snake = [
        {x:unidad * 4, y:0},
        {x:unidad * 3, y:0},
        {x:unidad * 2, y:0},
        {x:unidad, y:0},
        {x:0, y:0}
    ];
    empezar();
};
