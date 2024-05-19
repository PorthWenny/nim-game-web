import { supabase } from "./database.js";

export default function handleGameEnd(turns) {
  if (turns % 2 === 0) {
    supabase.from("user_info").insert();
  } else {
    // Player 2 wins
  }
}
