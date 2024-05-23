import { supabase } from "../auth/database.js";
import { getNimSum, getHighest } from "./calculations.js";

export function handleGameEnd(lastTurn) {
  if (lastTurn == "computer") {
  } else {
  }
}

export function bestPlay(jar, free) {
  let count = 0;
  let highestIndex = jar.indexOf(Math.max(...jar));
  let jarCopy = jar.map((x) => x);

  while (free.length !== 0) {
    jarCopy[highestIndex] -= 1;
    count++;

    if (jarCopy[highestIndex] === 0) {
      free = free.filter((item) => item !== highestIndex);
      highestIndex = getHighest(jar, free);
      count = 0;
      jarCopy = jar.map((x) => x);
      continue;
    }

    if (getNimSum(jarCopy) === 0) {
      break;
    }
  }
  jar[highestIndex] = jarCopy[highestIndex];
  return {
    message:
      count === 0
        ? "There is no optimal play. Play anything."
        : `Optimal play: Remove ${count} from Row ${highestIndex + 1}.`,
    highestIndex,
    count,
  };
}
