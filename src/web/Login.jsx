import React, { useEffect, useState } from "react";
import { supabase } from "../js/database.js";

export default function login() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession();
    setSession(session);
    setUser(session?.user);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        switch (event) {
          case "SIGNED_IN":
            setUser(session?.user);
            break;
          case "SIGNED_OUT":
            setUser(null);
            break;
          default:
            break;
        }
      }
    );

    // Cleanup function
    return () => {
      supabase.removeAllChannels();
    };
  }, []);

  async function githubLogin() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  }

  async function logout() {
    const { data, error } = await supabase.auth.signOut();
  }

  async function fetchUser() {
    const session = supabase.auth.getSession();

    if (session) {
      const { data, error } = await supabase
        .from("user_info")
        .select("*")
        .eq("user_id", session.user);

      if (error) {
        console.error("Error fetching user info:", error);
        return;
      }

      if (data.length > 0) {
        // User is already in the table, fetch stats
        const stats = {
          wins: data[0].wins,
          loses: data[0].loses,
          accuracy: data[0].accuracy,
        };
        return stats;
      } else {
        // User is not in the table, insert user id
        const { error: insertError } = await supabase
          .from("user_info")
          .insert([
            { user_id: session.user, wins: 0, loses: 0, accuracy: 100 },
          ]);

        if (insertError) {
          console.error("Error inserting user info:", insertError);
        }
      }
    }
  }

  return (
    <div>
      {user ? (
        <div>
          <h1>Authenticated. </h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={(githubLogin, fetchUser)}>Login with Github</button>
      )}
    </div>
  );
}
