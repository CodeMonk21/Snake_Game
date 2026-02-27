//Logic:- No of board columns = boardAcutalWidth/boxWidht--> whole no of this
//Logic:- No of board rows = boardAcutalHeight/boxHeight--> whole no of this
const board = document.querySelector(".gridBoard");
// const startButton = document.querySelector(".startButton")
// const gameBlock = document.querySelector(".model")
const blockHeight = 50;
const blockWidth = 50;

const columns = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let interval = null
let food = {x:Math.floor(Math.random() * rows+1),y:Math.floor(Math.random() * columns+1)}

const blocks = [];
const snake = [
  { x: 1, y: 5 },
]
let direction = "right"
let score = 0
let highScore = 0

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


//Event listner for keypress
document.body.addEventListener("keydown",(event)=>{
    switch (event.key) {
        case "ArrowRight":
            direction = "right"
            break;
        case "ArrowLeft":
            direction = "left"
            break;
        case "ArrowDown":
            direction = "down"
            break;
        case "ArrowUp":
            direction = "up"
            break;
        default:
            break;
    }
})

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
function renderSnake(){
    let head = null

    blocks[`${food.x}-${food.y}`].classList.add("foodFill")

    //Check direction
    if(direction=="left"){
        head = {x:snake[0].x,y:snake[0].y-1}
    }
    else if(direction=="right"){
        head = {x:snake[0].x,y:snake[0].y+1}
    }
    else if(direction=="down"){
        head = {x:snake[0].x+1,y:snake[0].y}
    }
    else if(direction=="up"){
        head = {x:snake[0].x-1,y:snake[0].y}
    }

    //Check if head of snake hit boundry
    if(head.y<0 || head.y>=columns || head.x<0 || head.x>=rows){
        EndGame()
    }
    //Check if snake eat food & update snake body and score
    if(head.x==food.x && head.y==food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("foodFill")
        snake.unshift(head)
        food = {x:Math.floor(Math.random() * rows),y:Math.floor(Math.random() * columns)}
        updateScore()
    }

    //Remove color from snake previous cordinate
    snake.unshift(head)
    let remove = snake.pop()
    blocks[`${remove.x}-${remove.y}`].classList.remove("fill")

    //Color Snake body
    snake.forEach((cord) => {
      blocks[`${cord.x}-${cord.y}`].classList.add("fill")
    });

    
}


// interval = setInterval(()=>{
//     renderSnake()
// },400)





