//Logic:- No of board columns = boardAcutalWidth/boxWidht--> whole no of this
//Logic:- No of board rows = boardAcutalHeight/boxHeight--> whole no of this
const board = document.querySelector(".gridBoard");
const startButton = document.querySelector(".startButton");
const modal = document.querySelector(".model");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".end-game");
const restartButton = document.querySelector(".restartButton");
const hightScoreElement = document.querySelector(".highScore");
const scoreElement = document.querySelector(".score");
const timeElement = document.querySelector(".time");
const blockHeight = 50;
const blockWidth = 50;

const columns = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let interval = null;
let timeInterval = null;
let food = {
  x: Math.floor(Math.random() * rows + 1),
  y: Math.floor(Math.random() * columns + 1),
};

const blocks = [];
let snake = [{ x: 1, y: 5 }];
let direction = "right";
let score = 0;
let highScore = localStorage.getItem("hightScore");
let time = `00-00`;
let speed = 300

//Blocks box create
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    const blockElement = document.createElement("div");
    blockElement.classList.add("box");
    blocks[`${i}-${j}`] = blockElement;
    board.appendChild(blockElement);
  }
}

//Render Snake object
function renderSnake() {
  let head = null;

  hightScoreElement.innerHTML = highScore;

  blocks[`${food.x}-${food.y}`].classList.add("foodFill");

  //Check direction
  if (direction == "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction == "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction == "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction == "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  }

  //Body collision logic:- Wall boundry or body collide
  if (collisionLogic(head)) {
    clearInterval(interval);
    clearInterval(timeInterval);
    head = { x: 1, y: 5 };
    gameOverModal.style.display = "flex";
  }

  //Food eating logic
  if (head.x == food.x && head.y == food.y) {
    //Update food previous position and snake body
    blocks[`${food.x}-${food.y}`].classList.remove("foodFill");
    snake.unshift(head);
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * columns),
    };
    //Update the score
    score++;
    scoreElement.innerHTML = score;
    //Update the hightscore according to it
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("hightScore", score);
    }
    //increse speed:- 50 millisecond
    if(speed>=150){
        speed -= 40
    }
  }

  //Remove color from snake previous cordinate
  snake.forEach((cord) => {
    blocks[`${cord.x}-${cord.y}`].classList.remove("fill");
  });
  snake.unshift(head);
  snake.pop();
  //Color Snake body
  snake.forEach((cord) => {
    blocks[`${cord.x}-${cord.y}`].classList.add("fill");
  });
}

function restartGame() {
  blocks[`${food.x}-${food.y}`].classList.remove("foodFill");
  snake.forEach((cord) => {
    blocks[`${cord.x}-${cord.y}`].classList.remove("fill");
  });
  gameOverModal.style.display = "none";
  direction = "right";
  score = 0;
  scoreElement.innerHTML = "00";
  snake = [{ x: 1, y: 5 }];
  time = `00-00`;
  timeElement.innerHTML = time;
  interval = setInterval(() => renderSnake(), 400);
}

//Return true or false if the snake is collied or not
function collisionLogic(snakeHead) {
    let snakeBody = snake.slice(1)
    if(snakeHead.y < 0 || snakeHead.y >= columns || snakeHead.x < 0 || snakeHead.x >= rows){
        return true
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if(snakeBody[i].x==snakeHead.x && snakeBody[i].y==snakeHead.y){
            return true
        }
    }
    return false
}

//Start button
startButton.addEventListener("click", () => {
  modal.style.display = "none";
  let [minute, second] = time.split("-").map((time) => Number(time));
  interval = setInterval(() => renderSnake(), speed);
  timeInterval = setInterval(() => {
    second++;
    if (second >= 60) {
      minute++;
      second = 0;
    }
    timeElement.innerHTML = `${minute}-${second}`;
  }, 1000);
});

restartButton.addEventListener("click", restartGame);

//Event listner for keypress
document.body.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowRight":
      direction = "right";
      break;
    case "ArrowLeft":
      direction = "left";
      break;
    case "ArrowDown":
      direction = "down";
      break;
    case "ArrowUp":
      direction = "up";
      break;
    default:
      break;
  }
});
