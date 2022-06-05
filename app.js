const playerOne = "R";
const playerTwo = "B";
let currentPlayer = playerOne;
let board;
let currentColumns;
let isGameLoadedOnLoad = false;
let gameOver = false;
const row = 6;
const column = 7;

let winner;
let winnerOne;
let winnerTwo;

window.onload = function () {
  setGame();
  isGameLoadedOnLoad = true;
  winner = document.getElementById("sub-header");
  winnerOne = document.getElementById("player-one-name").innerHTML;
  winnerTwo = document.getElementById("player-two-name").innerHTML;
};

function enterNameOne() {
  let nameOne = prompt("Enter Player One Name", "Name");

  if (nameOne !== null) {
      winnerOne = nameOne;
    document.getElementById("player-one-name").innerHTML = winnerOne;
  }
}

function enterNameTwo() {
  let nameTwo = prompt("Enter Player Two Name", "Name");
  if (nameTwo !== null) {
      winnerTwo = nameTwo;
    document.getElementById("player-two-name").innerHTML = winnerTwo;
  }
}

function setGame() {
  if (isGameLoadedOnLoad) {
    document.getElementById("board-container").innerHTML = "";
  }

  board = [];
  currentColumns = [5, 5, 5, 5, 5, 5, 5];
  for (let rowIndex = 0; rowIndex < row; rowIndex++) {
    let row = [];
    for (let columnIndex = 0; columnIndex < column; columnIndex++) {
      row.push(" ");

      const space = document.createElement("div");
      space.id = rowIndex.toString() + ":" + columnIndex.toString();
      space.classList.add("space");
      document.getElementById("board-container").append(space);
      space.addEventListener("click", makeMove);
    }
    board.push(row);
  }
}

function playAgain() {
  setGame();
  gameOver = false;
  winner.innerText = "Create A Line Of Four In Any Direction And Win!";
  currentPlayer = playerOne;
}

//make player chosen moves on board
function makeMove() {
  if (gameOver) {
    return;
  }
  let spaceCoordinates = this.id.split(":");
  let r = parseInt(spaceCoordinates[0]);
  let c = parseInt(spaceCoordinates[1]);
  r = currentColumns[c];

  if (r < 0) {
    return;
  }
  board[r][c] = currentPlayer;
  let space = document.getElementById(r.toString() + ":" + c.toString());
  if (currentPlayer == playerOne) {
    space.classList.add("red-piece");
    currentPlayer = playerTwo;
  } else {
    space.classList.add("black-piece");
    currentPlayer = playerOne;
  }
  r -= 1;
  currentColumns[c] = r;
  checkWinner();
}

//check diagnol going left
function checkWinner() {
  for (let r = 3; r < row; r++) {
    for (let c = 0; c < column - 3; c++) {
      if (board[r][c] !== " ") {
        if (
          board[r][c] === board[r - 1][c + 1] &&
          board[r - 1][c + 1] === board[r - 2][c + 2] &&
          board[r - 2][c + 2] === board[r - 3][c + 3]
        ) {
          declareWinner(r, c);
          return;
        }
      }
    }
  }

  //check diagnol going right
  for (let r = 0; r < row - 3; r++) {
    for (let c = 0; c < column - 3; c++) {
      if (board[r][c] !== " ") {
        if (
          board[r][c] === board[r + 1][c + 1] &&
          board[r + 1][c + 1] === board[r + 2][c + 2] &&
          board[r + 2][c + 2] === board[r + 3][c + 3]
        ) {
          declareWinner(r, c);
          return;
        }
      }
    }
  }

  //check row
  for (let r = 0; r < row; r++) {
    for (let c = 0; c < column; c++) {
      if (board[r][c] !== " ") {
        if (
          board[r][c] === board[r][c + 1] &&
          board[r][c + 1] === board[r][c + 2] &&
          board[r][c + 2] === board[r][c + 3]
        ) {
          declareWinner(r, c);
          return;
        }
      }
    }
  }

  //check column
  for (let c = 0; c < column; c++) {
    for (let r = 0; r < row - 3; r++) {
      if (board[r][c] !== " ") {
        if (
          board[r][c] === board[r + 1][c] &&
          board[r + 1][c] === board[r + 2][c] &&
          board[r + 2][c] === board[r + 3][c]
        ) {
          declareWinner(r, c);
          return;
        }
      }
    }
  }
}

//change sub-header when a player wins
function declareWinner(r, c) {
  if (board[r][c] === playerOne) {
    winner.innerText = winnerOne + " Wins CONNECT - 4!";
  } else {
    winner.innerText = winnerTwo + " Wins CONNECT - 4!";
  }
  gameOver = true;
}
