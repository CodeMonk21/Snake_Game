//Logic:- No of board columns = boardAcutalWidth/boxWidht--> whole no of this
//Logic:- No of board rows = boardAcutalHeight/boxHeight--> whole no of this
const board = document.querySelector(".gridBoard");
const startButton = document.querySelector(".startButton");
const modal = document.querySelector(".model");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".end-game");
const restartButton = document.querySelector(".restartButton");
const blockHeight = 50;
const blockWidth = 50;

const columns = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let interval = null;
let food = {
  x: Math.floor(Math.random() * rows + 1),
  y: Math.floor(Math.random() * columns + 1),
};

const blocks = [];
let snake = [{ x: 1, y: 5 }];
let direction = "right";
let score = 0;
let highScore = 0;

// //Function to update score
// const updateScore = ()=>{
//     score++
//     document.querySelector(".score").innerText = score
//     if(score>highScore){
//         highScore = score
//         document.querySelector(".highScore").innerHTML = highScore
//         sessionStorage.setItem("highScore",highScore)
//     }
// }

//Blocks box create
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    const blockElement = document.createElement("div");
    blockElement.classList.add("box");
    blockElement.innerHTML = `${i}-${j}`;
    blocks[`${i}-${j}`] = blockElement;
    board.appendChild(blockElement);
  }
}

//Render Snake object
function renderSnake() {
  let head = null;

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

  //Wall collision logic
  if (head.y < 0 || head.y >=columns || head.x < 0 || head.x >=rows) {
    clearInterval(interval);
    head = { x: 1, y: 5 };
    gameOverModal.style.display = "flex";
  }
  //Food eatin logic
  if (head.x == food.x && head.y == food.y) {
    blocks[`${food.x}-${food.y}`].classList.remove("foodFill");
    snake.unshift(head);
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * columns),
    };
    // updateScore();
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
  direction = "right"
  snake = [{ x: 1, y: 5 }];
  interval = setInterval(() => renderSnake(), 400);
}

//Start button
startButton.addEventListener("click", () => {
  modal.style.display = "none";
  interval = setInterval(() => {
    renderSnake();
  }, 400);
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
