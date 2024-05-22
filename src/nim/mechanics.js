import { supabase } from "../auth/database.js";

export function handleGameEnd(turns) {
  if (turns % 2 === 0) {
    // add win in supabase
  } else {
  }
}

var jar = [1, 3, 5, 7];
var free = [0, 1, 2, 3];

function getHighest(jar, free) {
  var biggest = 0;
  var highestIndex = -1;

  for (var x of free) {
    if (jar[x] > biggest) {
      biggest = jar[x];
      highestIndex = x;
    }
  }

  return highestIndex;
}

function getNimSum(jar) {
  var nim_sum = 0;

  for (var cookie of jar) {
    nim_sum = nim_sum ^ cookie;
  }

  return nim_sum;
}

export function bestPlay() {
  var count = 0;
  var highest_index = jar.indexOf(Math.max(...jar));
  var jarCopy = jar.map((x) => x);

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
    return "There is no optimal play. Play anything.";
  } else {
    return "Optimal play: remove ", count, " from Row ", highest_index + 1;
  }
}
