export function calcWinRate(wins, loses) {
  return (wins / (wins + loses)) * 100;
}

export function calcAccuracy(nims_done, total_rounds) {
  return (nims_done / total_rounds) * 100;
}

export function getHighest(jar, free) {
  let biggest = 0;
  let highestIndex = -1;

  for (let x of free) {
    if (jar[x] > biggest) {
      biggest = jar[x];
      highestIndex = x;
    }
  }

  return highestIndex;
}

export function getNimSum(jar) {
  let nim_sum = 0;

  for (let cookie of jar) {
    nim_sum = nim_sum ^ cookie;
  }

  return nim_sum;
}

export function isWinningMove(jar, rowIndex, removeCount) {
  const jarCopy = jar.slice();
  jarCopy[rowIndex] -= removeCount;
  return getNimSum(jarCopy) === 0;
}
