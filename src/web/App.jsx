import { useState, useEffect } from "react";
import Game from "../nim/Game.jsx";
import Picker from "../nim/roulette/Picker.jsx";
//import { bestPlay } from "../nim/mechanics.js";
import "./styles.css";

function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [bestMove, setBestMove] = useState(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  // useEffect(() => {
  //   const move = bestPlay(jar, free);
  //   setBestMove(move);
  // }, []);

  return (
    <>
      <div className="header">
        <div className="title">NIM GAME</div>

        <div className="subtitle">
          a simple game <br></br> of math and strategy
        </div>
      </div>

      <div className="game-box">
        <Picker />
        <Game />
        <div className="show-button" onClick={toggleVisibility}>
          {isVisible ? "Hide Text" : "Show Text"}
        </div>
        {isVisible && <p className="suggestion-box"> {bestMove} </p>}
      </div>
    </>
  );
}

export default App;

// success message
console.log("App.jsx loaded");
