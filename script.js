const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#status");
const restartButton = document.querySelector("#restart");

let currentPlayer = "X";
let gameOver = false;
let board = Array(9).fill("");

const winningLines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function checkWinner() {
  return winningLines.some(([a, b, c]) =>
    board[a] &&
    board[a] === board[b] &&
    board[a] === board[c]
  );
}

function playCell(index) {
  if (gameOver || board[index]) return;

  board[index] = currentPlayer;
  cells[index].textContent = currentPlayer;
  cells[index].disabled = true;

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameOver = true;
    cells.forEach(cell => cell.disabled = true);
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameOver = true;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
  }
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => playCell(index));
});

restartButton.addEventListener("click", () => {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameOver = false;
  statusText.textContent = "X's turn";

  cells.forEach(cell => {
    cell.textContent = "";
    cell.disabled = false;
  });
});