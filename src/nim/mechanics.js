import { supabase } from "../auth/database.js";
import { getNimSum, getHighest } from "./calculations.js";

export function handleGameEnd(lastTurn) {
  if (lastTurn == "computer") {
    // loss logic
  } else {
    // win logic
  }
}

let play_text = "";

export function bestPlay(jar, free) {
  let count = 0;
  let highest_index = jar.indexOf(Math.max(...jar));
  let jarCopy = jar.map((x) => x);

  while (free.length != 0) {
    jarCopy[highest_index] -= 1;
    count++;

    console.log(jarCopy);
    console.log("Current Nim Sum: ", getNimSum(jarCopy));

    if (jarCopy[highest_index] == 0) {
      free = free.filter((item) => item !== highest_index);

      highest_index = getHighest(jar, free);
      count = 0;

      jarCopy = jar.map((x) => x);
      continue;
    }

    if (getNimSum(jarCopy) == 0) {
      break;
    }
  }
  jar[highest_index] = jarCopy[highest_index];

  if (count == 0) {
    play_text = "There is no optimal play. Play anything.";
  } else {
    play_text = "Optimal play: Remove " + count + " from Row " + (highest_index + 1) + ".";
  }

  return play_text;
}