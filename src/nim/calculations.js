var jar = [1, 3, 5, 7];
var free = [0, 1, 2, 3];

export function calcWinRate(wins, loses) {
  return (wins / (wins + loses)) * 100;
}

export function calcAccuracy(nims_done, total_rounds) {
  return (nims_done / total_rounds) * 100;
}
