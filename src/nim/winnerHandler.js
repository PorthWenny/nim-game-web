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

export function setGameStart() {}
