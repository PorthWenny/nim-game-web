import { useState, useEffect } from "react";
import Game from "../nim/Game.jsx";
import Roulette from "../nim/Roulette.jsx";
import Login from "../auth/Login.jsx";
import {
  getGameStart,
  setGameStartUpdateCallback,
} from "../nim/parents/winnerHandler.js";
import "./styles.css";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [bestMove, setBestMove] = useState(null);
  const [isStart, setIsStart] = useState(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    setIsStart(getGameStart());
  }, []);

  useEffect(() => {
    setGameStartUpdateCallback((gameStart) => {
      setIsStart(gameStart);
    });
  }, []);

  const handleGameEnd = () => {
    console.log("False again");
    setIsStart(false);
  };

  return (
    <>
      <div className="header">
        <div className="title">NIM GAME</div>
        <div className="subtitle">
          a simple game <br /> of math and strategy
        </div>
        <Login />
      </div>

      <div className="game-box">
        {isStart === false ? (
          <Roulette />
        ) : (
          <>
            <Game setBestMove={setBestMove} />
            <div className="show-button" onClick={toggleVisibility}>
              {isVisible ? "Hide Text" : "Show Text"}
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
