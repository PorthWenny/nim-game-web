import React, { useEffect, useState } from "react";
import { supabase } from "./database.js";
import { calcWinRate, calcAccuracy } from "../nim/calculations.js";

export default function login() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        switch (event) {
          case "SIGNED_IN":
            setUser(session?.user);
            fetchUser(session.user).then((data) => setStats(data));
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

  async function fetchUser(user) {
    if (user) {
      const { data, error } = await supabase
        .from("user_info_tb")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching user info:", error);
        return;
      }

      if (data.length > 0) {
        // User is already in the table, fetch stats
        const stats = {
          wins: data[0].wins,
          loses: data[0].loses,
          nim_done: data[0].nim_done,
          rounds_done: data[0].rounds_done,
        };
        return stats;
      } else {
        // User is not in the table, insert user id
        const { error: insertError } = await supabase
          .from("user_info_tb")
          .insert([
            {
              user_id: user.id,
              name: user.user_metadata.name,
              wins: 0,
              loses: 0,
              nim_done: 0,
            },
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
        <div className="profile">
          <h1 onClick={() => setOpenProfile((prev) => !prev)}>
            {user.user_metadata.full_name}
          </h1>
          {openProfile && (
            <ul className="dropdown-menu">
              <li>
                <b>Win Rate:</b>{" "}
                {Math.round(calcWinRate(stats?.wins, stats?.loses) * 100) / 100}
                %
              </li>
              <li>
                <b>Accuracy:</b>{" "}
                {Math.round(
                  calcAccuracy(stats?.nim_done, stats?.rounds_done) * 100
                ) / 100}
                %
              </li>
              <button className="log-button" onClick={logout}>
                Logout
              </button>
            </ul>
          )}
        </div>
      ) : (
        <button className="log-button" onClick={githubLogin}>
          Login with Github
        </button>
      )}
    </div>
  );
}
