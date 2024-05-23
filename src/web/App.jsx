import { useState, useEffect } from "react";
import Game from "../nim/Game.jsx";
import Roulette from "../nim/Roulette.jsx";
import Login from "../auth/Login.jsx";
import {
  getGameStart,
  setGameStartUpdateCallback,
} from "../nim/parents/winnerHandler.js";
import "./styles.css";
import { supabase } from "../auth/database.js";

function App({ initialState, saveState }) {
  const [isVisible, setIsVisible] = useState(false);
  const [bestMove, setBestMove] = useState(null);
  const [isStart, setIsStart] = useState(null);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLogin = (loggedInUser, userStats) => {
    setUser(loggedInUser);
    setStats(userStats);
  };

  const updateUserInfo = async (user, updatedStats) => {
    const { error } = await supabase
      .from("user_info_tb")
      .update({
        wins: updatedStats.wins,
        loses: updatedStats.loses,
        nim_done: updatedStats.nim_done,
        rounds_done: updatedStats.rounds_done,
      })
      .eq("user_id", user.id);

    if (error) {
      console.error("Error updating user info:", error);
    } else {
      setStats(updatedStats);
    }
  };

  useEffect(() => {
    setIsStart(getGameStart());
  }, []);

  useEffect(() => {
    setGameStartUpdateCallback((gameStart) => {
      setIsStart(gameStart);
    });
  }, []);

  useEffect(() => {
    if (initialState) {
      setUser(initialState.user);
      setStats(initialState.stats);
    }
  }, [initialState]);

  useEffect(() => {
    saveState({ user, stats });
  }, [user, stats, saveState]);

  return (
    <>
      <div className="header">
        <div className="title">NIM GAME</div>
        <div className="subtitle">
          a simple game <br /> of math and strategy
        </div>
        <Login onLogin={handleLogin} />
      </div>

      <div className="game-box">
        {isStart === false ? (
          <Roulette />
        ) : (
          <>
            <Game
              setBestMove={setBestMove}
              user={user}
              initialStats={stats}
              updateUserInfo={updateUserInfo}
            />
            <div className="show-button" onClick={toggleVisibility}>
              {isVisible ? "Hide Hint" : "Show Hint"}
            </div>
            {isVisible && <p className="suggestion-box"> {bestMove} </p>}
          </>
        )}
      </div>
    </>
  );
}

export default App;

// success message
console.log("App.jsx loaded");
