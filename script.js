
function init() {
    canvas = document.getElementById('mycanvas');

    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;

    pen = canvas.getContext('2d');
    apple_img = new Image();
    trophy = new Image();
    trophy.src = 'Assets/trophy.png';
    apple_img.src = 'Assets/apple.png';

    score = 10;

    snake = {
        len: 5,
        cells: [],
        color: 'blue',
        direction: 'right',
        size: 30,
        food: undefined,

        create: function () {
            for (let i = this.len - 1; i >= 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },

        draw: function () {
            pen.fillStyle = this.color;
            for (let i = 0; i < this.cells.length; i++) {
                pen.fillRect(this.cells[i].x * this.size, this.cells[i].y * this.size, this.size, this.size);
            }

            pen.drawImage(apple_img, this.food.x * this.size, this.food.y * this.size, this.size, this.size);
            pen.drawImage(trophy, 20, 10, 60, 55);

            pen.fillStyle = 'black';
            pen.font = '20px Roboto';
            pen.fillText(score, 37, 35);
        },
    }

    snake.create();
    snake.food = getFood();
    snake.draw();
}

function draw() {
    pen.clearRect(0, 0, W, H);

    snake.draw();
}

function update() {

    headX = snake.cells[0].x;
    headY = snake.cells[0].y;

    if (headX >= snake.food.x && headY >= snake.food.y && headY < snake.food.y + 1 && headX < snake.food.x + 1) {
        score++;
        snake.food = getFood();
    }
    else {
        snake.cells.pop();
    }

    let nextX, nextY;

    if (snake.direction == 'right') {
        if (headX * snake.size >= W - snake.size) {
            nextX = 0;
            nextY = headY;
        }
        else {
            nextX = headX + 1;
            nextY = headY;
        }
    }

    else if (snake.direction == 'left') {
        if (headX <= 0) {
            nextX = W / snake.size - 1;
            nextY = headY;
        }
        else {
            nextX = headX - 1;
            nextY = headY;
        }
    }

    else if (snake.direction == 'up') {
        if (headY * snake.size <= 0) {
            nextY = H / snake.size - 1;
            nextX = headX;
        }
        else {
            nextX = headX;
            nextY = headY - 1;
        }
    }

    else if (snake.direction == 'down') {
        if (headY * snake.size >= H - snake.size) {
            nextY = 0;
            nextX = headX;
        }
        else {
            nextX = headX;
            nextY = headY + 1;
        }
    }

    for (let i = 1; i < snake.cells.length; i++) {
        if (snake.cells[i].x == headX && snake.cells[i].y == headY) {
            clearInterval(loop);
            alert("Game Over!!!\nYour final score: " + score);
        }
    }

    snake.cells.unshift({ x: nextX, y: nextY });
}

function getFood() {
    let X = Math.round(Math.random() * (W - snake.size) / snake.size);
    let Y = Math.round(Math.random() * (H - snake.size) / snake.size);

    for (let i = 0; i < snake.cells.length; i++) {
        if (snake.cells[i].x == X && snake.cells[i].y == Y) {
            return getFood();
        }
    }

    return { x: X, y: Y, color: 'red' };
}

function gameloop() {
    update();
    draw();
}
function checkloop() {
    clearInterval(loop);
    gameloop();
    setTimeout(100);
    loop = setInterval(gameloop, 100);
}

init();

loop = setInterval(gameloop, 100);

window.addEventListener('resize', function () {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;

    snake.draw();
});

window.addEventListener('keydown', function (e) {
    if (e.key == 'ArrowUp') {
        if (snake.direction == 'down') return;
        else snake.direction = 'up';
        checkloop();
    }
    else if (e.key == 'ArrowDown') {
        if (snake.direction == 'up') return;
        else snake.direction = 'down';
        checkloop();
    }
    else if (e.key == 'ArrowRight') {
        if (snake.direction == 'left') return;
        else snake.direction = 'right';
        checkloop();
    }
    else if (e.key == 'ArrowLeft') {
        if (snake.direction == 'right') return;
        else snake.direction = 'left';
        checkloop();
    }
});