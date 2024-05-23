let winner = null;
let winnerUpdateCallback = null;

export function setWinner(selectedWinner) {
  winner = selectedWinner;
  if (winnerUpdateCallback) {
    winnerUpdateCallback(winner);
  }
}

export function getWinner() {
  return winner;
}

export function setWinnerUpdateCallback(callback) {
  winnerUpdateCallback = callback;
}

let gameStart = false;
let gameStartUpdateCallback = false;

export function setGameStart(isStart) {
  gameStart = isStart;
  if (gameStartUpdateCallback) {
    gameStartUpdateCallback(gameStart);
  }
}

export function getGameStart() {
  return gameStart;
}

export function setGameStartUpdateCallback(callback) {
  gameStartUpdateCallback = callback;
}
